const CACHE_NAME = 'archive-v3';

const CACHE_FOREVER = [
  /\/_astro\//,
  /\/images\//,
  /\/fonts\//,
  /\.woff2$/,
  /\.webp$/,
  /\.jpg$/,
  /\.png$/,
  /manifest\.webmanifest$/,
];

const CACHE_NETWORK_FIRST = [
  /\.html$/,
  /\/$/,
];

const PRECACHE_URLS = [
  '/',
  '/coins',
  '/artifacts',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  const shouldCacheForever = CACHE_FOREVER.some((pattern) => pattern.test(url.pathname));
  const shouldNetworkFirst = CACHE_NETWORK_FIRST.some((pattern) => pattern.test(url.pathname));

  if (shouldCacheForever) {
    event.respondWith(cacheFirst(event.request));
  } else if (shouldNetworkFirst) {
    event.respondWith(networkFirst(event.request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline', { status: 503 });
  }
}
