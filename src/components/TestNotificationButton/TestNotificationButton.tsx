import { Button } from "@mui/material";
import { getOrCreateDeviceId } from "@UTILS/deviceId";
import { useState } from "react";
import { testNotification } from "../../services/deviceNotification";

export const TestNotificationButton = () => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("Send a test notification");

  const handleClick = async () => {
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
