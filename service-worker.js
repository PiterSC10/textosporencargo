const CACHE_NAME = 'ydg-static-v59-final';
const STATIC_ASSETS = [
  './favicon.png',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './apple-touch-icon.png',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './site.webmanifest?v=59'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS).catch(()=>{})));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Nunca interceptar HTML/navegación, POST ni recursos externos.
  if(req.method !== 'GET' || req.mode === 'navigate' || url.origin !== self.location.origin){
    return;
  }

  const isStatic = /\.(png|ico|webmanifest)$/i.test(url.pathname);
  if(!isStatic) return;

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(()=>{});
      return resp;
    }))
  );
});
