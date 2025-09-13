export interface DeviceDoc {
  device_id: string;
  fcm_token: string | null;
  products: Record<string, string[]>;
};

export const STORAGE_DEVICE_ID_KEY = "cohu_device_id";