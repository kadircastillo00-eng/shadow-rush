// ═══════════════════════════════════════════════════════════
//  Shadow Rush — Capacitor Configuration
//
//  !! ANTES DE GENERAR EL APK, actualiza estos valores !!
//  Usa los mismos IDs que en src/ads-config.js
// ═══════════════════════════════════════════════════════════
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // ── IDENTIDAD DE LA APP ─────────────────────────────────
  // appId: identificador único de tu app en Google Play
  // Cambia "com.shadowrush.game" por tu propio paquete
  appId: 'com.shadowrush.game',
  appName: 'Shadow Rush',

  // Directorio de salida de Vite (vite.android.config.ts → dist/public)
  webDir: 'dist/public',

  // ── PLUGINS ─────────────────────────────────────────────
  plugins: {
    AdMob: {
      // ↓ Tu AdMob App ID — el mismo que ADS_CONFIG.APP_ID en src/ads-config.js
      // Formato: ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX
      appId: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',

      // Activa solo durante pruebas — nunca en producción
      isTesting: false,
    },
  },

  // ── ANDROID ─────────────────────────────────────────────
  android: {
    // Evita que la app parpadee al cargar el WebView
    backgroundColor: '#050510',
  },
};

export default config;
