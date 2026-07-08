// ═══════════════════════════════════════════════════════════
//  Shadow Rush — AdManager
//  Soporta tres modos automáticamente:
//
//  1. NATIVO (APK Capacitor):
//     Detecta Capacitor.isNativePlatform() → llama al SDK nativo
//     de AdMob vía @capacitor-community/admob. Anuncios reales.
//
//  2. SIMULACIÓN WEB (navegador / dev):
//     Muestra overlays de demostración para probar el flujo
//     sin IDs reales ni APK.
//
//  No se necesita ningún cambio de código al cambiar de modo.
// ═══════════════════════════════════════════════════════════
import { ADS_CONFIG } from './ads-config.js';

// ── BRIDGE NATIVO: carga Capacitor + AdMob si estamos en APK ──
let _AdMob            = null;
let _BannerAdSize     = null;
let _BannerAdPosition = null;
let _isNative         = false;

const _nativeBridgeReady = (async () => {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) return;
    _isNative = true;

    const mod = await import('@capacitor-community/admob');
    _AdMob            = mod.AdMob;
    _BannerAdSize     = mod.BannerAdSize;
    _BannerAdPosition = mod.BannerAdPosition;

    await _AdMob.initialize({
      requestTrackingAuthorization: true,   // solo iOS
      initializeForTesting: ADS_CONFIG.IS_TESTING,
    });

    // Ajusta el padding inferior al tamaño real del banner nativo
    _AdMob.addListener('bannerAdSizeChanged', ({ height }) => {
      document.documentElement.style.setProperty('--admob-banner-h', height + 'px');
    });
  } catch {
    _isNative = false;
    _AdMob    = null;
  }
})();

// ── CLASE PRINCIPAL ───────────────────────────────────────────
export class AdManager {
  constructor() {
    this._cfg           = ADS_CONFIG;
    this._gamesPlayed   = 0;
    this._nextThreshold = this._rollThreshold();
    this._lastInterMs   = 0;
    this._overlay       = null;
    this._bannerVisible = false;
  }

  // ── IDs SEGÚN MODO ────────────────────────────────────────
  _interstitialId() {
    return this._cfg.IS_TESTING ? this._cfg.TEST_INTERSTITIAL_ID : this._cfg.INTERSTITIAL_ID;
  }
  _rewardedId() {
    return this._cfg.IS_TESTING ? this._cfg.TEST_REWARDED_ID : this._cfg.REWARDED_ID;
  }
  _bannerId() {
    return this._cfg.IS_TESTING ? this._cfg.TEST_BANNER_ID : this._cfg.BANNER_ID;
  }

  // ── FRECUENCIA / COOLDOWN ─────────────────────────────────
  _rollThreshold() {
    const lo = this._cfg.INTERSTITIAL_FREQ_MIN;
    const hi = this._cfg.INTERSTITIAL_FREQ_MAX;
    return lo + Math.floor(Math.random() * (hi - lo + 1));
  }

  _cooldownOk() {
    return (Date.now() - this._lastInterMs) / 1000 >= this._cfg.INTERSTITIAL_COOLDOWN_SEC;
  }

  onNewGame() {
    this._gamesPlayed++;
    return this._gamesPlayed >= this._nextThreshold && this._cooldownOk();
  }

  onWorldChange() {
    return this._cooldownOk() && Math.random() < this._cfg.WORLD_CHANGE_AD_CHANCE;
  }

  _markInterstitialShown() {
    this._gamesPlayed   = 0;
    this._nextThreshold = this._rollThreshold();
    this._lastInterMs   = Date.now();
  }

  // ── BANNER ────────────────────────────────────────────────
  // Mostrar banner en la parte inferior (solo en menú)
  async showBanner() {
    if (this._bannerVisible) return;
    this._bannerVisible = true;
    if (_isNative && _AdMob) {
      await this._nativeBannerShow();
    } else {
      this._simBannerShow();
    }
  }

  // Ocultar banner (al iniciar partida)
  async hideBanner() {
    if (!this._bannerVisible) return;
    this._bannerVisible = false;
    if (_isNative && _AdMob) {
      await this._nativeBannerHide();
    } else {
      this._simBannerHide();
    }
  }

  async _nativeBannerShow() {
    try {
      await _nativeBridgeReady;
      if (!_AdMob) return;
      await _AdMob.showBanner({
        adId:     this._bannerId(),
        adSize:   _BannerAdSize?.ADAPTIVE_BANNER   ?? 'ADAPTIVE_BANNER',
        position: _BannerAdPosition?.BOTTOM_CENTER ?? 'BOTTOM_CENTER',
        margin:   0,
        isTesting: this._cfg.IS_TESTING,
      });
      document.body.classList.add('banner-visible');
    } catch { /* continua sin banner si falla */ }
  }

  async _nativeBannerHide() {
    try {
      await _nativeBridgeReady;
      if (!_AdMob) return;
      await _AdMob.hideBanner();
      document.body.classList.remove('banner-visible');
    } catch {}
  }

  _simBannerShow() {
    const el = document.getElementById('ad-banner-sim');
    if (el) el.classList.remove('hidden');
    document.body.classList.add('banner-visible');
  }

  _simBannerHide() {
    const el = document.getElementById('ad-banner-sim');
    if (el) el.classList.add('hidden');
    document.body.classList.remove('banner-visible');
  }

  // ── INTERSTICIAL ──────────────────────────────────────────
  showInterstitial() {
    this._markInterstitialShown();
    return _isNative && _AdMob
      ? this._nativeInterstitial()
      : this._simulateInterstitial();
  }

  async _nativeInterstitial() {
    try {
      await _nativeBridgeReady;
      await _AdMob.prepareInterstitial({ adId: this._interstitialId() });
      await _AdMob.showInterstitial();
    } catch { /* continua si falla */ }
  }

  // ── ANUNCIO RECOMPENSADO ───────────────────────────────────
  showRewarded() {
    return _isNative && _AdMob
      ? this._nativeRewarded()
      : this._simulateRewarded();
  }

  async _nativeRewarded() {
    try {
      await _nativeBridgeReady;
      return await new Promise(async (resolve) => {
        let earned = false;

        // AdMob v8 Event names: rewardAdRewarded, rewardAdDismissed
        const rewardSub = await _AdMob.addListener(
          'rewardAdRewarded',
          () => { earned = true; }
        );
        const closeSub = await _AdMob.addListener(
          'rewardAdDismissed',
          () => {
            rewardSub.remove();
            closeSub.remove();
            resolve({ completed: earned });
          }
        );

        try {
          // AdMob v8 method names: prepareRewardedAd, showRewardedAd
          await _AdMob.prepareRewardedAd({ adId: this._rewardedId() });
          await _AdMob.showRewardedAd();
        } catch (err) {
          console.error('AdMob Rewarded Ad error:', err);
          rewardSub.remove();
          closeSub.remove();
          resolve({ completed: false });
        }
      });
    } catch {
      return { completed: false };
    }
  }

  // ── DOM HELPERS ───────────────────────────────────────────
  _getOverlay() {
    if (!this._overlay) this._overlay = document.getElementById('ad-overlay');
    return this._overlay;
  }

  _showPanel(id) {
    ['ad-inter-panel', 'ad-rewarded-panel'].forEach(panelId => {
      const el = document.getElementById(panelId);
      if (el) el.classList.toggle('hidden', el.id !== id);
    });
    this._getOverlay().classList.remove('hidden');
  }

  _hideOverlay() {
    this._getOverlay().classList.add('hidden');
  }

  // ── SIMULACIÓN INTERSTICIAL (web/dev) ────────────────────
  _simulateInterstitial() {
    return new Promise(resolve => {
      this._showPanel('ad-inter-panel');

      const skipSec = this._cfg.SIM_INTERSTITIAL_SKIP_AFTER_SEC;
      const timerEl = document.getElementById('ad-inter-timer');
      const skipBtn = document.getElementById('ad-inter-skip');

      skipBtn.classList.add('hidden');
      if (timerEl) timerEl.textContent = `Saltable en ${skipSec}s`;

      let elapsed = 0;
      let autoCloseId;

      const done = () => {
        clearInterval(tickId);
        clearTimeout(autoCloseId);
        skipBtn.onclick = null;
        this._hideOverlay();
        resolve();
      };

      const tickId = setInterval(() => {
        elapsed++;
        const rem = skipSec - elapsed;
        if (rem > 0) {
          if (timerEl) timerEl.textContent = `Saltable en ${rem}s`;
        } else {
          clearInterval(tickId);
          skipBtn.classList.remove('hidden');
          if (timerEl) timerEl.textContent = '';
        }
      }, 1000);

      autoCloseId = setTimeout(done, 30_000);
      skipBtn.onclick = done;
    });
  }

  // ── SIMULACIÓN RECOMPENSADO (web/dev) ────────────────────
  _simulateRewarded() {
    return new Promise(resolve => {
      this._showPanel('ad-rewarded-panel');

      const totalSec = this._cfg.SIM_REWARDED_DURATION_SEC;
      const fillEl   = document.getElementById('ad-rew-progress-fill');
      const timerEl  = document.getElementById('ad-rew-timer');
      const skipBtn  = document.getElementById('ad-rew-skip');

      if (fillEl) { fillEl.style.transition='none'; fillEl.style.width='0%'; void fillEl.offsetWidth; fillEl.style.transition=''; }
      if (timerEl) timerEl.textContent = `Mira ${totalSec}s para ganar tu revive`;
      skipBtn.classList.remove('hidden');

      let elapsed = 0;

      const done = (completed) => {
        clearInterval(tickId);
        skipBtn.onclick = null;
        this._hideOverlay();
        resolve({ completed });
      };

      const tickId = setInterval(() => {
        elapsed++;
        const pct = Math.min(100, (elapsed / totalSec) * 100);
        if (fillEl) fillEl.style.width = pct + '%';
        const rem = totalSec - elapsed;
        if (rem > 0) {
          if (timerEl) timerEl.textContent = `¡${rem}s restantes — sigue mirando!`;
        } else {
          clearInterval(tickId);
          if (timerEl) timerEl.textContent = '✅ ¡Anuncio completado — revive ganado!';
          skipBtn.classList.add('hidden');
          setTimeout(() => done(true), 1200);
        }
      }, 1000);

      skipBtn.onclick = () => done(false);
    });
  }
}
