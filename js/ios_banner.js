// Detects if device is iOS
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if the device is ipad
const isIpad = () => {
    return (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || navigator.userAgent.match(/iPad/i) != null
}

// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

const hideButton = function(){
    $("body").removeClass("is-ios-web-app");
    $("body").removeClass("is-ios-web-app-show");
};

// Checks if should display popup notification
console.log("Is iOS: ", isIos(), "Is Standalone: ", isInStandaloneMode());
if(isIos() && !isInStandaloneMode()) {
    if(isIpad()) {
        $("body").addClass("is-ipad");
    }
    setTimeout(function(){
        $("body").addClass("is-ios-web-app");
    }, 500);
    setTimeout(function(){
        $("body").addClass("is-ios-web-app-show");
    }, 510);
    $(document).on("click touch tap touchstart", function(){
        console.log("clicked");
        hideButton();
    });
    // setTimeout(hideButton, 5000);
}