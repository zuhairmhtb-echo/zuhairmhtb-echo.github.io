const version_number = 'v3'; // Change this version number everytime a file is updated so that the install event gets triggered in the client side and updated changes are re-cached
const staticCacheName = 'site-static-' + version_number; // Name of cache where the static files will be stored
const dynamicCacheName = 'site-dynamic-' + version_number; // Name of the cache where the dynamic files (e.g. pages navigated by user) will be stored
const assets = [
    '/', // Index page (Request to the server)
    '/index.html', // Index page (Request to the server)
    '/pages/fallback.html', // Fallback Page (Display when user is offline and request does not exist in cache)
    '/js/app.js', // Static resource
    '/js/ui.js', // Static resource
    '/js/materialize.min.js', // Static resource
    '/css/styles.css', // Static resource
    '/css/materialize.min.css', // Static resource
    '/img/dish.png', // Static resource
    'https://fonts.googleapis.com/icon?family=Material+Icons', // CDN data
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2' // CDN Data on which Materialize is dependent

]; // Resources that will be cached for offline use

// Listen for install event
self.addEventListener('install', evt => {
    console.log("Service worker has been installed");
    evt.waitUntil( // Make the event listener wait/last until caching is complete so that the service worker keeps running while caching
        // Cache Data when the application is done installing
        caches.open(staticCacheName).then(
            cache => {
                console.log("Caching Assets...")
                // cache.add(); // Add a resource to the cache
                cache.addAll(assets); // Add an array of resources to the cache
            }
        ).catch(
            err => console.log("Could not cache assets", err)
        )
    );

});

// Listen for Activate Event
self.addEventListener('activate', evt => {
    console.log("Service Worker has been activated");
    // Delete all old caches in case version number changed
    evt.waitUntil( // Make the event listener wait until old caches are deleted
        caches.keys().then(
            keys => {
                return Promise.all( // Take an array of promises and when all promises resolve, this promise gets resolved
                    keys.filter( // For each key
                        key => key !== staticCacheName // Return the key if it does not match the current cache name
                    ).map(
                        key => caches.delete(key) // Delete the key
                    )
                )
            }
        )
    );
});

// Listen for fetch events
self.addEventListener('fetch', evt => {
    // console.log("Fetch event has been triggered.", evt);
    evt.respondWith( // Intercept the request and respond with data from the cache (if available)
        caches.match(evt.request).then(// If request's response is available in cache
            cacheResponse => { // Either a pre-cached response that matched the request or null
                return cacheResponse || fetch(evt.request).then( // Return the pre-cached response or forward the request to server and return the response
                    fetchResponse => { // Cache the response in dynamic cache so that it can be used later when the user is offline
                        return caches.open(dynamicCacheName).then(cache => {
                            cache.put(evt.request.url, fetchResponse.clone()); // Append the request url and response to the cache
                            return fetchResponse;
                        });
                    }
                );
            }
        ).catch( // Return the fallback page as response if data is neither available in cache and the user is offline
            () => caches.match('/pages/fallback.html')
        )
    );
});