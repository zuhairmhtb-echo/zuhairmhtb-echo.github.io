if('serviceWorker' in navigator) { // Check if the browser supports Service Workers
    
    // Register the Service Worker
    console.log("Service Worker exists. Registering...");
    navigator.serviceWorker.register('/sw.js').then(
        (reg) => {
            console.log("Successfully registered service worker", reg);
        }
    ).catch(
        (err) => console.log("Could not register service worker ", err)
    );

} else {
    console.log("Service Worker does not exist");
}