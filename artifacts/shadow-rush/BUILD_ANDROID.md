# Shadow Rush — Cómo generar el APK con AdMob nativo

Este proyecto usa **Capacitor 8** con `@capacitor-community/admob`.  
Una vez configurado, el proceso de build es **3 comandos** sin tocar código en Android Studio.

---

## Prerequisitos (instalar una sola vez)

| Herramienta | Versión | Descarga |
|---|---|---|
| Node.js | 20 LTS+ | https://nodejs.org |
| pnpm | 9+ | `npm i -g pnpm` |
| Java JDK | 17 o 21 | https://adoptium.net |
| Android Studio | Hedgehog+ | https://developer.android.com/studio |

> Android Studio incluye el **Android SDK** y las **Android Build Tools**.  
> Tras instalar Android Studio, abre SDK Manager y asegúrate de tener:  
> - Android SDK Platform 34 (o superior)  
> - Android SDK Build-Tools 34+  
> - Android Emulator (opcional, para pruebas)

---

## Paso 1 — Configura tus IDs de AdMob

Edita **dos archivos**:

### `src/ads-config.js`
```js
APP_ID:          'ca-app-pub-TUXXXXXXXX~TUXXXXXXXXXX',
INTERSTITIAL_ID: 'ca-app-pub-TUXXXXXXXX/TUXXXXXXXXXX',
REWARDED_ID:     'ca-app-pub-TUXXXXXXXX/TUXXXXXXXXXX',
IS_TESTING: false,   // ← cambia a true para pruebas
```

### `capacitor.config.ts`
```ts
plugins: {
  AdMob: {
    appId: 'ca-app-pub-TUXXXXXXXX~TUXXXXXXXXXX',  // ← mismo APP_ID
  }
}
```

> ⚠️ Si los IDs no coinciden, AdMob mostrará "Application ID inválido".

---

## Paso 2 — ✅ Ya hecho: proyecto Android generado

El proyecto `android/` ya está creado y configurado con:
- `AndroidManifest.xml` con tu App ID de AdMob real inyectado
- `build.gradle` con `play-services-ads` incluido automáticamente vía el plugin
- Plugin `@capacitor-community/admob@8.0.0` enlazado
- Kotlin 2.0.21 configurado en el root `build.gradle`

**No necesitas volver a ejecutar `npx cap add android`.**

---

## Paso 3 — Build y sync (cada vez que cambies código)

```bash
cd artifacts/shadow-rush
pnpm run cap:sync
```

Este comando hace internamente:
1. `vite build --config vite.android.config.ts` — compila la web
2. `npx cap sync android` — copia los archivos al proyecto Android e instala plugins

---

## Paso 4 — Generar el APK

### Opción A — Comando (más rápido)
```bash
cd android
./gradlew assembleDebug          # APK de prueba
./gradlew assembleRelease        # APK firmado (requiere keystore)
```

El APK se genera en:
```
android/app/build/outputs/apk/debug/app-debug.apk
android/app/build/outputs/apk/release/app-release.apk
```

### Opción B — Android Studio (más visual)
```bash
pnpm run cap:open
```
Se abre Android Studio. Luego: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

---

## Tus IDs de AdMob (ya configurados)

| Campo | Valor |
|---|---|
| App ID | `ca-app-pub-1783386752606440~3992016204` |
| Banner | `ca-app-pub-1783386752606440/3447266892` |
| Interstitial | `ca-app-pub-1783386752606440/2922477112` |
| Rewarded | `ca-app-pub-1783386752606440/5357068766` |

Ya están en `src/ads-config.js`, `capacitor.config.ts` y `android/app/src/main/AndroidManifest.xml`.

---

## Paso 5 — Firmar para Google Play (solo release)

Crea un keystore (una sola vez):
```bash
keytool -genkey -v -keystore shadow-rush.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias shadow-rush
```

Edita `android/app/build.gradle` y añade:
```groovy
signingConfigs {
    release {
        storeFile file('../../shadow-rush.jks')
        storePassword 'TU_PASSWORD'
        keyAlias 'shadow-rush'
        keyPassword 'TU_PASSWORD'
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
    }
}
```

Luego: `./gradlew bundleRelease` para generar el `.aab` para Play Store.

---

## Workflow habitual (después del setup inicial)

```
1. Edita código en artifacts/shadow-rush/src/
2. cd artifacts/shadow-rush && pnpm run cap:sync
3. cd android && ./gradlew assembleDebug
4. Instala en dispositivo: adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## Modo prueba (IDs de test de Google)

Para probar sin riesgo de ban:

```js
// src/ads-config.js
IS_TESTING: true,
```

Esto usa automáticamente los Ad Unit IDs de prueba de Google:
- Interstitial: `ca-app-pub-3940256099942544/1033173712`
- Rewarded: `ca-app-pub-3940256099942544/5224354917`

> Activa `IS_TESTING: false` **solo** antes del build de producción para Google Play.

---

## Solución de problemas

| Error | Solución |
|---|---|
| `JAVA_HOME not set` | Instala JDK 17+ y configura la variable de entorno |
| `SDK location not found` | Abre Android Studio → SDK Manager, anota la ruta del SDK |
| `AdMob: Application ID not found` | Verifica que el App ID en `capacitor.config.ts` coincida con el de AdMob |
| Los anuncios no aparecen | Activa `IS_TESTING: true` para verificar que el SDK funciona |
| `npx cap sync` no encuentra Android | Ejecuta `npx cap add android` primero |
