self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('jct-store').then((cache) => cache.addAll([
      '/css/',
      '/js/',
      '/installer.js',
      '/index.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  console.log('cache fetch error:', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});