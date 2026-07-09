---
name: Shadow Rush AdMob v8 event names
description: Correct event names and API for @capacitor-community/admob v8 rewarded ads — wrong names caused the revive flow to hang.
---

## The rule
`@capacitor-community/admob` v8 rewarded-ad events use these names (via `RewardAdPluginEvents` enum):
- `onRewardedVideoAdReward` — reward earned (fires only on full view)
- `onRewardedVideoAdDismissed` — ad closed (fires on full view OR early close)
- `onRewardedVideoAdFailedToShow` — show failure
- `onRewardedVideoAdFailedToLoad` — load failure

**Why:** The old code used `onRewardedVideoAdRewardedEvent` and `onRewardedVideoAdClosed` — neither exists in v8. These events never fired, leaving the promise unresolved and breaking the "watch ad to revive" flow.

**How to apply:** Always import `RewardAdPluginEvents` from `@capacitor-community/admob` and reference enum values — never hardcode event name strings. Use a `settled` guard + listener cleanup in the promise to prevent double-resolve or leaks. Add a 60s watchdog timeout in case OEM/SDK never emits dismissal.

## Method names (correct in v8)
- `prepareRewardVideoAd({ adId, isTesting })` — loads the ad
- `showRewardVideoAd()` — shows it (resolves when shown, not when closed)
- `prepareInterstitial({ adId, isTesting })` + `showInterstitial()` — correct as-is
- `showBanner({ adId, adSize, position, margin, isTesting })` + `hideBanner()` — correct as-is

## Revive gating pattern
```js
const result = await adMgr.showRewarded();
if (result.completed) revivePlayer(); else actuallyDie();
```
`completed` is `true` only when `Dismissed` fires after `Rewarded` — early close → `false`.
