// ═══════════════════════════════════════════════════════════
//  Shadow Rush — Google AdMob Configuration
//  !! Reemplaza TODOS los placeholders con tus IDs reales !!
// ═══════════════════════════════════════════════════════════
//
//  INSTRUCCIONES:
//  1. Ve a https://admob.google.com → Apps → Agregar app → Android
//  2. Copia tu App ID  (formato: ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX)
//  3. Crea tres Ad Units: "Banner", "Interstitial" y "Rewarded"
//  4. Pega los IDs abajo
//  5. Copia el mismo App ID en capacitor.config.ts → plugins.AdMob.appId
//
//  ⚠️ OJO CON "REWARDED" vs "REWARDED INTERSTITIAL":
//  AdMob ofrece DOS formatos parecidos en la sección de anuncios
//  recompensados:
//    • "Rewarded"              ← el que usa este juego (video que el
//                                 usuario elige ver a cambio de una
//                                 recompensa). Usa este.
//    • "Rewarded interstitial" ← formato distinto, con otra API nativa
//                                 (prepareRewardInterstitialAd). Si
//                                 REWARDED_ID pertenece a este tipo,
//                                 el SDK falla con el error:
//                                 "Ad unit doesn't match format".
//  Verifica el tipo del ad unit en AdMob → Anuncios → (tu unidad) →
//  columna "Formato de anuncio" — debe decir exactamente "Rewarded".
//
//  INTEGRACIÓN NATIVA (APK con Capacitor):
//  — Lee BUILD_ANDROID.md para las instrucciones completas
// ═══════════════════════════════════════════════════════════

export const ADS_CONFIG = {

  // ── IDs REALES DE ADMOB ───────────────────────────────────
  APP_ID:          'ca-app-pub-1783386752606440~3992016204',
  INTERSTITIAL_ID: 'ca-app-pub-1783386752606440/2922477112',
  REWARDED_ID:     'ca-app-pub-1783386752606440/4384706366',
  BANNER_ID:       'ca-app-pub-1783386752606440/3447266892',

  // ── MODO PRUEBA ───────────────────────────────────────────
  // true  → usa IDs de prueba de Google (no genera ingresos, no hay riesgo de ban)
  // false → usa tus IDs reales (solo en producción)
  IS_TESTING: false,

  // IDs de anuncios de prueba de Google (no los cambies)
  TEST_INTERSTITIAL_ID: 'ca-app-pub-3940256099942544/1033173712',
  TEST_REWARDED_ID:     'ca-app-pub-3940256099942544/5224354917',
  TEST_BANNER_ID:       'ca-app-pub-3940256099942544/6300978111',

  // ── FRECUENCIA DE INTERSTICIALES ─────────────────────────
  INTERSTITIAL_FREQ_MIN: 2,
  INTERSTITIAL_FREQ_MAX: 3,
  INTERSTITIAL_COOLDOWN_SEC: 90,

  // Probabilidad (0–1) de intersticial en cambio de mundo
  WORLD_CHANGE_AD_CHANCE: 0.40,

  // ── SIMULACIÓN WEB (navegador/dev) ────────────────────────
  SIM_INTERSTITIAL_SKIP_AFTER_SEC: 5,
  SIM_REWARDED_DURATION_SEC: 6,
};
