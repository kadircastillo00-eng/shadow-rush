// Shadow Rush — Service Worker
// Caches all static assets for offline play and instant loading

const CACHE_NAME = 'shadow-rush-v1';
const RUNTIME_CACHE = 'shadow-rush-runtime-v1';

// Assets to pre-cache on install.
// Resolved relative to this file's own location (self.location), so this
// works whether the game is served from the domain root or a sub-path
// (e.g. GitHub Pages project sites at https://user.github.io/repo/).
const PRECACHE_ASSETS = [
  './',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
].map(path => new URL(path, self.location).href);

// Install: pre-cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== RUNTIME_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate for game assets, network-first for HTML
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and cross-origin requests (e.g. Google Fonts)
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) {
    // For cross-origin (fonts, etc.) — network only, no caching
    return;
  }

  // HTML: network-first so the game always loads fresh code when online
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // JS/CSS/images: stale-while-revalidate (serve cache immediately, update in background)
  event.respondWith(
    caches.open(RUNTIME_CACHE).then(cache =>
      cache.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        });
        return cached || fetchPromise;
      })
    )
  );
});
