importScripts('/build/AssetsManager.js');
const assetsManager = new AssetsManager();
// use the page.js hash as the cache key
const releaseVersion = "1.2.3";
const cacheName = assetsManager.hashes[0] + releaseVersion;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Opened cache for:', __webpack_hash__, assetsManager.cacheEntries);
                return cache.addAll(assetsManager.cacheEntries);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('*** NEW SERVICE WORKER ACTIVE ***');
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
        if (key !== cacheName) {
            return caches.delete(key);
        }
    })))
});

self.addEventListener('fetch', event => {
    console.log('fetch request', __webpack_hash__, event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                console.log('cache match', __webpack_hash__);
                if (response) {
                    console.log('cache response', event.request);
                    return response;
                }
                return fetch(event.request);
            })
    );
});

console.log("Worker with valid cache<<");

self.addEventListener('message', msg => {
    const indexJs = new URL(location).searchParams.get('indexJs');
    console.log(indexJs, 'indexJs');
    console.log("Message to", cacheName);
    console.log('msg', msg);

    self.postMessage("my result JSJS");
});