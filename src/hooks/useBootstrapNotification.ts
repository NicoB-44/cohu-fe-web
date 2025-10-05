import { useState } from "react";
import { useUpsertDeviceMutation } from "./useDeviceQuery";
import { requestPermissionAndToken } from "../services/fcm";

export const useBootstrapNotifications = () => {
  const [status, setStatus] = useState<"idle"|"asking"|"granted"|"denied"|"unsupported">("idle");
  const upsertMutation = useUpsertDeviceMutation();

  const bootstrap = async () => {
      setStatus("asking");
      try {
        const { deviceId, fcmToken, permission } = await requestPermissionAndToken();
        if (permission !== "granted") { setStatus("denied"); return; }

        if (!fcmToken) { throw new Error("FCM token is null despite permission granted"); }

        setStatus("granted");
        await upsertMutation.mutateAsync({
          device_id: deviceId,
          fcm_token: fcmToken,
          products: {},
        });
      } catch (error) {
        setStatus("denied");
        console.error("Failed to bootstrap notifications", error);
      }
    };

  return { bootstrap, status, upserting: upsertMutation.isPending };
};
