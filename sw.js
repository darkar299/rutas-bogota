const CACHE = 'rutas-shell-v3';
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.add('./')).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('rutas-shell-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { if (event.request.mode === 'navigate') event.respondWith(fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(c => c.put('./', copy)); } return response; }).catch(() => caches.match('./'))); });
