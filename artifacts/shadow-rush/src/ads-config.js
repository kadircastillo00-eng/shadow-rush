// ═══════════════════════════════════════════════════════════
//  Shadow Rush — Google AdMob Configuration
//  !! Reemplaza TODOS los placeholders con tus IDs reales !!
// ═══════════════════════════════════════════════════════════
//
//  INSTRUCCIONES:
//  1. Ve a https://admob.google.com → Apps → Agregar app → Android
//  2. Copia tu App ID  (formato: ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX)
//  3. Crea dos Ad Units: uno "Interstitial" y uno "Rewarded Video"
//  4. Pega los IDs de Ad Unit abajo
//
//  INTEGRACIÓN EN EL APK (TWA / PWABuilder):
//  — En tu proyecto Android, agrega el SDK de AdMob a build.gradle
//  — Inicializa AdMob con APP_ID en MainActivity.java
//  — Descomenta los bloques "NATIVE ADMOB BRIDGE" en src/ad-manager.js
// ═══════════════════════════════════════════════════════════

export const ADS_CONFIG = {

  // ── REEMPLAZA CON TUS IDs DE ADMOB ────────────────────────
  APP_ID:          'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  INTERSTITIAL_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  REWARDED_ID:     'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',

  // ── FRECUENCIA DE INTERSTICIALES ─────────────────────────
  // Se muestra uno cada N partidas (número aleatorio entre min y max)
  INTERSTITIAL_FREQ_MIN: 2,
  INTERSTITIAL_FREQ_MAX: 3,

  // Segundos mínimos entre dos intersticiales (cooldown global)
  INTERSTITIAL_COOLDOWN_SEC: 90,

  // Probabilidad (0–1) de mostrar intersticial al cambiar de mundo
  // (solo si el cooldown también ha transcurrido)
  WORLD_CHANGE_AD_CHANCE: 0.40,

  // ── SIMULACIÓN (web / dev) ────────────────────────────────
  // Segundos antes de que aparezca "Saltar" en intersticial simulado
  SIM_INTERSTITIAL_SKIP_AFTER_SEC: 5,
  // Duración total del anuncio recompensado simulado (segundos)
  SIM_REWARDED_DURATION_SEC: 6,
};
