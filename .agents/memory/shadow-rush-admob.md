---
name: Shadow Rush AdMob v8 event names
description: Correct event names and API for @capacitor-community/admob v8 rewarded ads — wrong names caused the revive flow to hang.
---

## The rule
`@capacitor-community/admob` v8 rewarded-ad events use these names (via `RewardAdPluginEvents` enum):
- `onRewardedVideoAdLoaded` — video ready to show (Loaded)
- `onRewardedVideoAdReward` — reward earned (fires only on full view)
- `onRewardedVideoAdDismissed` — ad closed (fires on full view OR early close)
- `onRewardedVideoAdFailedToShow` / `onRewardedVideoAdFailedToLoad` — failures

**Why:** Two bugs were found across sessions:
1. Old code used non-existent event names (`onRewardedVideoAdRewardedEvent`, `onRewardedVideoAdClosed`).
2. Even with correct event names, using `Promise.all([addListeners]).then(subs => handles=subs)` creates a race: if `.then()` never runs (addListener error), handles are lost and ghost listeners persist across games.

**How to apply:** Use **sequential `await`+`push` per `addListener`** so each handle is stored immediately. Never use Promise.all then-assignment for cleanup-critical handles. Expose the Promise resolve externally (`let _resolve; new Promise(r => { _resolve = r; })`) to avoid async-executor anti-pattern. Use `Loaded` event (not sequential await of `prepareRewardVideoAd`) as the trigger for `showRewardVideoAd()`.

## Correct v8 pattern for rewarded ad
```js
// Sequential registration — each handle captured before next addListener
subs.push(await AdMob.addListener(ev.Loaded,       () => AdMob.showRewardVideoAd().catch(() => finish(false))));
subs.push(await AdMob.addListener(ev.Rewarded,     () => { earned = true; }));
subs.push(await AdMob.addListener(ev.Dismissed,    () => finish(earned)));
subs.push(await AdMob.addListener(ev.FailedToShow, () => finish(false)));
subs.push(await AdMob.addListener(ev.FailedToLoad, () => finish(false)));
await AdMob.prepareRewardVideoAd({ adId, isTesting }); // Loaded event triggers show
```

## Method names (correct in v8)
- `prepareRewardVideoAd({ adId, isTesting })` — starts loading; `Loaded` event signals ready
- `showRewardVideoAd()` — shows it; call ONLY from Loaded handler
- `prepareInterstitial({ adId, isTesting })` + `showInterstitial()` — correct as-is
- `showBanner({ adId, adSize, position, margin, isTesting })` + `hideBanner()` — correct as-is

## Revive gating pattern
```js
const result = await adMgr.showRewarded();
if (result.completed) revivePlayer(); else actuallyDie();
```
`completed` is `true` only when `Dismissed` fires after `Rewarded` — early close → `false`.
