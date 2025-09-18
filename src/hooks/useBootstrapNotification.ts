import { useState } from "react";
import { useUpsertDeviceMutation } from "./useDeviceQuery";
import { requestPermissionAndToken } from "../services/fcm";

export const useBootstrapNotifications = () => {
  const [status, setStatus] = useState<"idle"|"asking"|"granted"|"denied"|"unsupported">("idle");
  const upsertMutation = useUpsertDeviceMutation();

  const bootstrap = async () => {
      setStatus("asking");
      try {
        // const sup = await import("firebase/messaging").then(m => m.isSupported());
        // if (!(await sup)) { setStatus("unsupported"); return; }

        const { deviceId, fcmToken, permission } = await requestPermissionAndToken();
        if (permission !== "granted") { setStatus("denied"); return; }

        setStatus("granted");
        await upsertMutation.mutateAsync({
          device_id: deviceId,
          fcm_token: fcmToken ?? null,
          products: {},
        });
      } catch {
        setStatus("denied");
      }
    };

  return { bootstrap, status, upserting: upsertMutation.isPending };
};
