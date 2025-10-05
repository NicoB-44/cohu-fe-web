import { API_BASE_URL } from "@CONSTANTS/api";
import { getOrCreateDeviceId } from "@UTILS/deviceId";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMessaging, getToken, isSupported, Messaging, onMessage } from "firebase/messaging";
import Message from "@COMPONENTS/Message/Message";

const firebaseConfig = {
  apiKey: "AIzaSyASQVCg8yyA_oRBn_PnGQUYTg4WwHjqByI",
  authDomain: "pc-scraper-poc.firebaseapp.com",
  projectId: "pc-scraper-poc",
  storageBucket: "pc-scraper-poc.firebasestorage.app",
  messagingSenderId: "474435730603",
  appId: "1:474435730603:web:ddd69a9b3cbc88de24cbee"
};
const VAPID_KEY = "BEDtl9sNUtmXUDO7H2AD1LUPHLcJDu52S0EvIqo1yY1037ImBACqibsrupCA-8TeP_thjOktue4tgnayfojFU3c";

let app = null;
export let messagingRef: Messaging | null = null;

const initialize = async () => {
  app = initializeApp(firebaseConfig);
  messagingRef = getMessaging(app);
  onMessage(messagingRef, (payload) => {
    toast(<Message notification={payload.notification} />);
  });
}

initialize();

export const ensureMessaging = async (): Promise<Messaging | null> => {
  if (!(await isSupported())) {
    console.warn("Firebase messaging is not supported in this browser");
    return null;
  }
  if (!messagingRef) {
    await initialize();
  }
  return messagingRef;
};

export const requestPermissionAndToken = async (): Promise<{ deviceId: string; fcmToken: string | null; permission: NotificationPermission; }> => {
  const deviceId = getOrCreateDeviceId();
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return { deviceId, fcmToken: null, permission };
  }
  const messaging = await ensureMessaging();
  if (!messaging) return { deviceId, fcmToken: null, permission: "denied" };

  const swReg = await navigator.serviceWorker.getRegistration("/cohu-fe-web/firebase-messaging-sw.js");
  console.log("Service worker registration found:", swReg);
  const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: swReg ?? undefined });
  return { deviceId, fcmToken, permission: "granted" };
};

export const upsertDevice = async (params: { device_id: string; fcm_token?: string | null; products?: Record<string, string[]>; }) => {
  const res = await fetch(`${API_BASE_URL}/anon/device`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`Upsert failed: ${res.status}`);
  return res.json();
};
