/* global self, clients */
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyASQVCg8yyA_oRBn_PnGQUYTg4WwHjqByI",
  authDomain: "pc-scraper-poc.firebaseapp.com",
  projectId: "pc-scraper-poc",
  storageBucket: "pc-scraper-poc.firebasestorage.app",
  messagingSenderId: "474435730603",
  appId: "1:474435730603:web:ddd69a9b3cbc88de24cbee"
});
const messaging = firebase.messaging();

// Data-only payload
messaging.onBackgroundMessage((payload) => {
  const title = payload?.data?.title || "Notification";
  const options = {
    body: payload?.data?.body || "",
    icon: "/icon.png",
    image: payload?.data?.image,
    data: { url: payload?.data?.url || "/" },
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event?.notification?.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
