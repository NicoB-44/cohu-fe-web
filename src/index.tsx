import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

if ("serviceWorker" in navigator) {
  (async () => {
    try {
      await navigator.serviceWorker.register("/cohu-fe-web/firebase-messaging-sw.js");
      console.log("Service Worker registered successfully.");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  })();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
