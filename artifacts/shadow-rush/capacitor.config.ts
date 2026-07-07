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
      appId: 'ca-app-pub-1783386752606440~3992016204',

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
