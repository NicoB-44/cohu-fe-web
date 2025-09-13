import { STORAGE_DEVICE_ID_KEY } from "@TYPES/notifications";

export const getOrCreateDeviceId = (): string => {
  let id = localStorage.getItem(STORAGE_DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_DEVICE_ID_KEY, id);
  }
  return id;
}
