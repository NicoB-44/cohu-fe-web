import { API_BASE_URL } from "@CONSTANTS/api";
import { getOrCreateDeviceId } from "@UTILS/deviceId";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyASQVCg8yyA_oRBn_PnGQUYTg4WwHjqByI",
  authDomain: "pc-scraper-poc.firebaseapp.com",
  projectId: "pc-scraper-poc",
  storageBucket: "pc-scraper-poc.firebasestorage.app",
  messagingSenderId: "474435730603",
  appId: "1:474435730603:web:ddd69a9b3cbc88de24cbee"
};
const VAPID_KEY = firebaseConfig.apiKey;

let messagingRef: Messaging | null = null;

export const ensureMessaging = async (): Promise<Messaging | null> => {
  if (!(await isSupported())) return null;
  if (!messagingRef) {
    const app = initializeApp(firebaseConfig);
    messagingRef = getMessaging(app);
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

  const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
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
