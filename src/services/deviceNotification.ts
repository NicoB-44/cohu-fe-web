import { API_BASE_URL } from "@CONSTANTS/api";
import { DeviceDoc } from "@TYPES/notifications";

export const getDevice = async (device_id: string): Promise<DeviceDoc> => {
  const res = await fetch(`${API_BASE_URL}/anon/device?device_id=${encodeURIComponent(device_id)}`);
  if (!res.ok) throw new Error(`GET device failed: ${res.status}`);
  return res.json();
};

export const testNotification = async (device_id: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/anon/test-notification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device_id }),
  });
  if (!res.ok) throw new Error(`Test notification failed: ${res.status}`);
};