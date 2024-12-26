const CACHE_NAME = "squash-ghosting-cache-v1";
const ASSETS = [
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./images/position-1.jpg",
    "./images/position-2.jpg",
    "./images/position-3.jpg",
    "./images/position-4.jpg",
    "./images/position-5.jpg",
    "./images/position-6.jpg",
    "./images/icon-192x192.png",
    "./images/icon-512x512.png"
];

// Install event: cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch event: serve cached files if offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        )
    );
});
