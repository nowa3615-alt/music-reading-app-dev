const CACHE_NAME = "music-reading-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];


// ==============================
// インストール
// ==============================

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(urlsToCache);
      })
  );
});


// ==============================
// キャッシュ取得
// ==============================

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        // キャッシュ優先
        if(response){
          return response;
        }

        return fetch(event.request);
      })
  );
});