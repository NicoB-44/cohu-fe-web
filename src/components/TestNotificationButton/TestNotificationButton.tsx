import { Button } from "@mui/material";
import { getOrCreateDeviceId } from "@UTILS/deviceId";
import { useState } from "react";
import { testNotification } from "../../services/deviceNotification";
import { useBootstrapNotifications } from "@HOOKS/useBootstrapNotification";

export const TestNotificationButton = () => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("Send a test notification");
  const { bootstrap } = useBootstrapNotifications();

  const handleClick = async () => {
    await bootstrap();
    setLoading(true);
    try {
      await testNotification(getOrCreateDeviceId());
      setLabel("Notification sent ✔︎");
    } catch {
      setLabel("Failed to send notification");
    } finally {
      setLoading(false);
      setTimeout(() => setLabel("Send a test notification"), 2500);
    }
  };

  return (
    <Button variant="contained" onClick={handleClick} disabled={loading}>
      {label}
    </Button>
  );
}
