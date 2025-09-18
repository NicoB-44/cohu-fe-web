/* global self, clients */
importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyASQVCg8yyA_oRBn_PnGQUYTg4WwHjqByI",
  authDomain: "pc-scraper-poc.firebaseapp.com",
  projectId: "pc-scraper-poc",
  storageBucket: "pc-scraper-poc.firebasestorage.app",
  messagingSenderId: "474435730603",
  appId: "1:474435730603:web:ddd69a9b3cbc88de24cbee"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'New Notification';
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.message || 'New update available',
        icon: '/img/logo.png',
        badge: '/img/badge.png',
        data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event?.notification?.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
