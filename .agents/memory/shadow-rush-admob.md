---
name: Shadow Rush AdMob v8 integration — bugs and patterns
description: Complete audit of @capacitor-community/admob v8 in Shadow Rush. Covers rewarded, interstitial, banner bugs and correct API usage.
---

## Correct v8 event names (enum values)

### RewardAdPluginEvents
| Key | String value |
|---|---|
| Loaded | `onRewardedVideoAdLoaded` |
| Rewarded | `onRewardedVideoAdReward` |
| Dismissed | `onRewardedVideoAdDismissed` |
| FailedToShow | `onRewardedVideoAdFailedToShow` |
| FailedToLoad | `onRewardedVideoAdFailedToLoad` |
| Showed | `onRewardedVideoAdShowed` (optional, not needed for revive flow) |

### InterstitialAdPluginEvents
| Key | String value |
|---|---|
| Loaded | `interstitialAdLoaded` |
| FailedToLoad | `interstitialAdFailedToLoad` |
| Dismissed | `interstitialAdDismissed` |
| FailedToShow | `interstitialAdFailedToShow` |
| Showed | `interstitialAdShowed` |

### BannerAdPluginEvents
| Key | String value |
|---|---|
| SizeChanged | `bannerAdSizeChanged` |
| Loaded | `bannerAdLoaded` |
| FailedToLoad | `bannerAdFailedToLoad` |

## Correct method names (v8)
- `prepareRewardVideoAd({ adId, isTesting })` → starts load; Loaded event = ready
- `showRewardVideoAd()` → call ONLY from Loaded handler
- `prepareInterstitial({ adId, isTesting })` → starts load; Loaded event = ready
- `showInterstitial()` → call ONLY from Loaded handler
- `showBanner({ adId, adSize, position, margin, isTesting })` → first creation
- `hideBanner()` → hide but keep in memory
- `resumeBanner()` → show again after hide (NOT showBanner again)
- `removeBanner()` → destroy completely

## Bugs found and fixed (full audit)

### BUG 1 — Wrong event names (original, fixed first session)
Code used `onRewardedVideoAdRewardedEvent` / `onRewardedVideoAdClosed` — neither exists in v8. Promise never resolved.

### BUG 2 — Promise.all then-assignment race on listener registration
`Promise.all([addListeners]).then(subs => handles=subs)` — if `.then()` never runs, handles are lost and ghost listeners persist. Fixed with sequential `await+push`.

### BUG 3 — Sequential prepare→show without Loaded event (rewarded)
`prepareRewardVideoAd()` can resolve before video is ready. Fixed: use Loaded event as trigger for `showRewardVideoAd()`.

### BUG 4 — Same sequential problem for interstitial
`prepareInterstitial() → showInterstitial()` without waiting for Loaded. Fixed: same event-driven pattern as rewarded. Dismissed handler triggers `_markInterstitialShown()` (not before, to avoid consuming cooldown on failed loads).

### BUG 5 — Banner: showBanner() called on every show
After `hideBanner()`, calling `showBanner()` again stacks native views or errors. Fixed: track `_bannerCreated`; use `resumeBanner()` on subsequent shows.

### BUG 6 — _bannerCreated stuck true after async load failure
`showBanner()` sets `_bannerCreated=true` synchronously, but `bannerAdFailedToLoad` fires asynchronously later. Next show calls `resumeBanner()` on a dead view. Fixed: listen to `bannerAdFailedToLoad` once; reset `_bannerCreated=false` so next show recreates.

### BUG 7 — Wrong AD_ID permission package name
`com.google.android.permission.AD_ID` → wrong (does nothing).  
Correct: `com.google.android.gms.permission.AD_ID` (GMS package).  
Without it: near-zero ad fill on Android 13+ (API 33+).

### BUG 8 — Interstitial cooldown consumed even on ad failure
`_markInterstitialShown()` was called before load attempt. Fixed: moved into Dismissed handler with `shown` flag — cooldown only activates when ad actually closed after being shown.

## Correct event-driven pattern (applies to both rewarded and interstitial)

```js
// Expose resolve externally (avoid async executor anti-pattern)
let _resolve;
const adPromise = new Promise(r => { _resolve = r; });
const subs = [];
let settled = false;

const finish = (result) => {
  if (settled) return;
  settled = true;
  clearTimeout(watchdog);
  subs.forEach(h => { try { h.remove(); } catch (_) {} });
  _resolve(result);
};

const watchdog = setTimeout(() => finish(false), 60_000); // 30s for interstitial

try {
  // Sequential await+push — each handle in subs before registering next
  subs.push(await AdMob.addListener(ev.Loaded, () => AdMob.showXxx().catch(() => finish(false))));
  subs.push(await AdMob.addListener(ev.FailedToLoad, () => finish(false)));
  subs.push(await AdMob.addListener(ev.FailedToShow, () => finish(false)));
  subs.push(await AdMob.addListener(ev.Dismissed,    () => finish(true)));
  await AdMob.prepareXxx({ adId, isTesting });
} catch { finish(false); }

return adPromise;
```

**Why sequential:** Promise.all then-assignment loses handles if `.then()` never runs (partial addListener failure), leaving ghost listeners that corrupt future ad calls.

## AndroidManifest.xml checklist
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>
```

## GitHub Actions CI
- JDK must be 21 (not 17) — capacitor-android uses sourceCompatibility=JavaVersion.VERSION_21
- pnpm 10.26.1, Node 24, temurin 21
