import { Button } from "@mui/material";
import { useState } from "react";
import { testNotification } from "../../services/deviceNotification";
import { useBootstrapNotifications } from "@HOOKS/useBootstrapNotification";
import { useTranslation } from "react-i18next";

export const TestNotificationButton = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [label, setLabel] = useState(t("TEST_NOTIFICATION.SEND"));

  const { getNotificationParams } = useBootstrapNotifications();

  const handleClick = async () => {
    setLoading(true);
    try {
      const { deviceId } = await getNotificationParams();
      if (!deviceId) throw new Error("No device ID available");
      await testNotification(deviceId);
      setLabel(t("TEST_NOTIFICATION.SENT"));
    } catch {
      setLabel(t("TEST_NOTIFICATION.ERROR"));
    } finally {
      setLoading(false);
      setTimeout(() => setLabel(t("TEST_NOTIFICATION.SEND")), 2500);
    }
  };

  return (
    <Button variant="contained" onClick={handleClick} disabled={loading}>
      {label}
    </Button>
  );
}
