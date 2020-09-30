# zuhairmhtb-echo.github.io
PWA Sample Application

This file is a demonstration of Progressive Web Application (PWA) using vanilla HTML, JS and CSS. The main files required for converting a web application to PWA are:

1. manifest.json

This file contains all configuration required to save the web application like a native app in android and iOS devices. 
This file should be placed in the root directory (generally next to index.html) so that it can access all the directories and files present within its working directory.

2. sw.js

This is the 'Service Worker' file which runs in a separate thread in order to intercept request made by the PWA app to the server and process the response accordingly. 
This file is installed the first time when a user runs the application in browser or whenever the file is updated. 

References:
a. https://www.netguru.com/codestories/pwa-on-ios
b. https://ng-chicago.github.io/2018/06/18/add-2-home-screen/
c. https://youtu.be/4XT23X0Fjfk