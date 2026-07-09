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
let _AdMob                       = null;
let _BannerAdSize                = null;
let _BannerAdPosition            = null;
let _RewardAdPluginEvents        = null;
let _InterstitialAdPluginEvents  = null;
let _isNative                    = false;

const _nativeBridgeReady = (async () => {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) return;
    _isNative = true;

    // API de @capacitor-community/admob v8: AdMob, enums y tipos se
    // exportan todos desde el paquete raíz (ver dist/esm/index.d.ts).
    const mod = await import('@capacitor-community/admob');
    _AdMob                       = mod.AdMob;
    _BannerAdSize                = mod.BannerAdSize;
    _BannerAdPosition            = mod.BannerAdPosition;
    _RewardAdPluginEvents        = mod.RewardAdPluginEvents;
    _InterstitialAdPluginEvents  = mod.InterstitialAdPluginEvents;

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
    this._overlay        = null;
    this._bannerVisible  = false;
    this._bannerCreated  = false;   // true after first showBanner(); use resumeBanner() after that
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
      if (this._bannerCreated) {
        // Banner ya existe en memoria: solo reactivarlo (no crear uno nuevo).
        // Llamar showBanner() de nuevo apila vistas nativas o lanza error.
        await _AdMob.resumeBanner();
      } else {
        // Suscribir primero el listener de fallo asíncrono de carga.
        // Si el SDK emite bannerAdFailedToLoad después de que showBanner()
        // resuelve, reseteamos _bannerCreated para que el siguiente intento
        // recree el banner en lugar de llamar resumeBanner() sobre una vista muerta.
        _AdMob.addListener('bannerAdFailedToLoad', () => {
          this._bannerCreated = false;
          this._bannerVisible = false;
          document.body.classList.remove('banner-visible');
        });
        await _AdMob.showBanner({
          adId:      this._bannerId(),
          adSize:    _BannerAdSize?.ADAPTIVE_BANNER   ?? 'ADAPTIVE_BANNER',
          position:  _BannerAdPosition?.BOTTOM_CENTER ?? 'BOTTOM_CENTER',
          margin:    0,
          isTesting: this._cfg.IS_TESTING,
        });
        this._bannerCreated = true;
      }
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
    // _markInterstitialShown() se llama solo cuando el ad realmente se mostró
    // (evento Dismissed en _nativeInterstitial, o al resolver en simulación).
    // Así no se consume el cooldown/contador si el ad falla al cargar.
    return _isNative && _AdMob
      ? this._nativeInterstitial()
      : this._simulateInterstitial();
  }

  async _nativeInterstitial() {
    // Flujo event-driven (mismo patrón que rewarded):
    //   prepareInterstitial() inicia la descarga del ad.
    //   El evento Loaded confirma que está listo → entonces showInterstitial().
    //   Dismissed → el ad se mostró y cerró → marcar cooldown aquí (no antes).
    //   FailedToLoad / FailedToShow → resuelve sin tocar el cooldown.
    //   Watchdog de 30 s por si el SDK no emite ningún evento.
    try { await _nativeBridgeReady; } catch { return; }
    if (!_AdMob) return;

    const ev = _InterstitialAdPluginEvents ?? {
      Loaded:       'interstitialAdLoaded',
      FailedToLoad: 'interstitialAdFailedToLoad',
      Dismissed:    'interstitialAdDismissed',
      FailedToShow: 'interstitialAdFailedToShow',
    };

    let _resolve;
    const adPromise = new Promise(r => { _resolve = r; });
    const subs      = [];
    let settled     = false;
    let shown       = false;   // true cuando el SDK confirma que el ad se mostró

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(watchdog);
      subs.forEach(h => { try { h.remove(); } catch (_) {} });
      // Marcar cooldown solo si el intersticial llegó a mostrarse y cerrarse.
      if (shown) this._markInterstitialShown();
      _resolve();
    };

    const watchdog = setTimeout(finish, 30_000);

    try {
      subs.push(await _AdMob.addListener(ev.Loaded,       () => { _AdMob.showInterstitial().catch(finish); }));
      subs.push(await _AdMob.addListener(ev.FailedToLoad, finish));
      subs.push(await _AdMob.addListener(ev.FailedToShow, finish));
      subs.push(await _AdMob.addListener(ev.Dismissed,    () => { shown = true; finish(); }));

      await _AdMob.prepareInterstitial({
        adId:      this._interstitialId(),
        isTesting: this._cfg.IS_TESTING,
      });
    } catch {
      finish();
    }

    return adPromise;
  }

  // ── ANUNCIO RECOMPENSADO ───────────────────────────────────
  showRewarded() {
    return _isNative && _AdMob
      ? this._nativeRewarded()
      : this._simulateRewarded();
  }

  // API de @capacitor-community/admob v8 — flujo orientado a eventos:
  //
  //  prepareRewardVideoAd() inicia la carga; cuando el SDK termina de
  //  descargar el video dispara el evento Loaded. Solo entonces llamamos
  //  showRewardVideoAd(). El evento Rewarded se emite ÚNICAMENTE si el
  //  usuario vio el anuncio completo. Dismissed se emite siempre al cerrar
  //  (con o sin recompensa). El jugador revive solo si Dismissed llega
  //  después de Rewarded.
  //
  //  Eventos v8 (RewardAdPluginEvents):
  //    Loaded       → 'onRewardedVideoAdLoaded'
  //    Rewarded     → 'onRewardedVideoAdReward'
  //    Dismissed    → 'onRewardedVideoAdDismissed'
  //    FailedToLoad → 'onRewardedVideoAdFailedToLoad'
  //    FailedToShow → 'onRewardedVideoAdFailedToShow'
  async _nativeRewarded() {
    // 1 ── Esperar a que el bridge nativo esté listo.
    try { await _nativeBridgeReady; } catch { return { completed: false }; }
    if (!_AdMob) return { completed: false };

    // Nombres de eventos del enum real de @capacitor-community/admob v8.
    // El fallback cubre el caso extremo en que el import dinámico falle.
    const ev = _RewardAdPluginEvents ?? {
      Loaded:       'onRewardedVideoAdLoaded',
      Rewarded:     'onRewardedVideoAdReward',
      Dismissed:    'onRewardedVideoAdDismissed',
      FailedToShow: 'onRewardedVideoAdFailedToShow',
      FailedToLoad: 'onRewardedVideoAdFailedToLoad',
    };

    // 2 ── Crear la promesa con su resolve expuesto afuera del constructor
    //       para poder resolverla desde código async sin usar `async` en el
    //       executor (anti-patrón que silencia errores).
    let _resolve;
    const adPromise = new Promise(r => { _resolve = r; });

    let earned  = false;
    let settled = false;
    const subs  = [];   // handles de los listeners; push inmediato = sin race

    // finish() se llama exactamente una vez (settled guard).
    // Limpia TODOS los listeners ya registrados en subs, sin importar
    // cuántos se hayan acumulado antes del fallo.
    const finish = (completed) => {
      if (settled) return;
      settled = true;
      clearTimeout(watchdog);
      subs.forEach(h => { try { h.remove(); } catch (_) {} });
      _resolve({ completed });
    };

    // Salvaguarda: 60 s sin eventos → fallo silencioso del SDK/OEM.
    const watchdog = setTimeout(() => finish(false), 60_000);

    // 3 ── Registro SECUENCIAL de listeners.
    //       Cada handle se añade a subs inmediatamente con await+push.
    //       Si cualquier addListener falla, subs contiene todos los handles
    //       ya registrados → finish(false) los limpia correctamente.
    //       Con Promise.all los handles perdidos si el .then() no se ejecuta.
    try {
      subs.push(await _AdMob.addListener(ev.Loaded, () => {
        // Loaded → el video está descargado; ahora sí es seguro mostrarlo.
        _AdMob.showRewardVideoAd().catch(() => finish(false));
      }));
      subs.push(await _AdMob.addListener(ev.Rewarded, () => {
        // Rewarded → el usuario vio el anuncio completo y ganó la recompensa.
        earned = true;
      }));
      subs.push(await _AdMob.addListener(ev.Dismissed, () => {
        // Dismissed → el anuncio se cerró (con o sin recompensa).
        // completed = true solo si Rewarded se emitió antes que Dismissed.
        finish(earned);
      }));
      subs.push(await _AdMob.addListener(ev.FailedToShow, () => finish(false)));
      subs.push(await _AdMob.addListener(ev.FailedToLoad, () => finish(false)));

      // 4 ── Iniciar la carga. El evento Loaded dispara showRewardVideoAd().
      await _AdMob.prepareRewardVideoAd({
        adId:      this._rewardedId(),
        isTesting: this._cfg.IS_TESTING,
      });
    } catch {
      // prepareRewardVideoAd() rechazó, o uno de los addListener() falló.
      // finish() limpia todo lo que esté en subs hasta ese momento.
      finish(false);
    }

    return adPromise;
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
