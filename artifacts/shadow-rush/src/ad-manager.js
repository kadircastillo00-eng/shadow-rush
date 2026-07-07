// ═══════════════════════════════════════════════════════════
//  Shadow Rush — AdManager
//  Capa de integración Google AdMob
//
//  Modo 1 — Simulación (web / navegador):
//    Muestra overlays de anuncio de demostración en pantalla.
//    Así puedes probar toda la lógica del juego sin IDs reales.
//
//  Modo 2 — Nativo (TWA / APK de PWABuilder):
//    Delega en window.AdMob o window.AdMobPlus (puente nativo).
//    Descomenta los bloques "NATIVE ADMOB BRIDGE" para activarlo.
// ═══════════════════════════════════════════════════════════
import { ADS_CONFIG } from './ads-config.js';

export class AdManager {
  constructor() {
    this._cfg           = ADS_CONFIG;
    this._gamesPlayed   = 0;
    this._nextThreshold = this._rollThreshold();
    this._lastInterMs   = 0;
    this._overlay       = null;
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

  // Llama antes de cada nueva partida.
  // Devuelve true si se debe mostrar un intersticial.
  onNewGame() {
    this._gamesPlayed++;
    return this._gamesPlayed >= this._nextThreshold && this._cooldownOk();
  }

  // Llama al cambiar de mundo.
  // Devuelve true si se debe mostrar un intersticial.
  onWorldChange() {
    return this._cooldownOk() && Math.random() < this._cfg.WORLD_CHANGE_AD_CHANCE;
  }

  _markInterstitialShown() {
    this._gamesPlayed   = 0;
    this._nextThreshold = this._rollThreshold();
    this._lastInterMs   = Date.now();
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

  // ── INTERSTICIAL ──────────────────────────────────────────
  // Resuelve cuando el anuncio se cierra (saltado o completado).
  showInterstitial() {
    this._markInterstitialShown();

    // ── NATIVE ADMOB BRIDGE (TWA / APK) ──────────────────────
    // Descomenta cuando AdMob esté configurado en tu proyecto Android:
    //
    // if (window.AdMob) {
    //   return new Promise(resolve => {
    //     window.AdMob.prepareInterstitial(
    //       { adId: this._cfg.INTERSTITIAL_ID },
    //       () => window.AdMob.showInterstitial(resolve, resolve),
    //       resolve
    //     );
    //   });
    // }
    // if (window.AdMobPlus) {
    //   return window.AdMobPlus.interstitial.show()
    //     .then(() => {}).catch(() => {});
    // }

    // ── SIMULACIÓN WEB ────────────────────────────────────────
    return this._simulateInterstitial();
  }

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

      // Auto-cierre a los 30s por si acaso
      autoCloseId = setTimeout(done, 30_000);
      skipBtn.onclick = done;
    });
  }

  // ── ANUNCIO RECOMPENSADO ───────────────────────────────────
  // Resuelve con { completed: boolean }
  showRewarded() {
    // ── NATIVE ADMOB BRIDGE (TWA / APK) ──────────────────────
    // Descomenta cuando AdMob esté configurado en tu proyecto Android:
    //
    // if (window.AdMob) {
    //   return new Promise(resolve => {
    //     window.AdMob.prepareRewardVideoAd(
    //       { adId: this._cfg.REWARDED_ID },
    //       () => window.AdMob.showRewardVideoAd(
    //         () => resolve({ completed: true }),
    //         () => resolve({ completed: false })
    //       ),
    //       () => resolve({ completed: false })
    //     );
    //   });
    // }
    // if (window.AdMobPlus) {
    //   return window.AdMobPlus.rewarded.show()
    //     .then(() => ({ completed: true }))
    //     .catch(() => ({ completed: false }));
    // }

    // ── SIMULACIÓN WEB ────────────────────────────────────────
    return this._simulateRewarded();
  }

  _simulateRewarded() {
    return new Promise(resolve => {
      this._showPanel('ad-rewarded-panel');

      const totalSec   = this._cfg.SIM_REWARDED_DURATION_SEC;
      const fillEl     = document.getElementById('ad-rew-progress-fill');
      const timerEl    = document.getElementById('ad-rew-timer');
      const skipBtn    = document.getElementById('ad-rew-skip');

      if (fillEl) fillEl.style.transition = 'none';
      if (fillEl) { fillEl.style.width = '0%'; void fillEl.offsetWidth; fillEl.style.transition = ''; }
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
