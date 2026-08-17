const CACHE_NAME = 'ydg-static-v66-side-nodes-premium';
const CORE_ASSETS = [
  './index.html',
  './site.webmanifest?v=66',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './restaurante.html',
  './electricista.html',
  './fontanero.html',
  './estetica.html',
  './webpersonal.html',
  './hotelmalaga.html'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS).catch(()=>{})));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if(req.method !== 'GET' || url.origin !== self.location.origin) return;
  if(req.mode === 'navigate'){
    event.respondWith(fetch(req).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
