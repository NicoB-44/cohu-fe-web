import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrCreateDeviceId } from "@UTILS/deviceId";
import { getDevice } from "../services/deviceNotification";
import { upsertDevice } from "../services/fcm";
import { DeviceDoc } from "@TYPES/notifications";

const qk = {
  device: (deviceId: string) => ["device", deviceId] as const,
};

export const useDeviceQuery = () => {
  const deviceId = getOrCreateDeviceId();
  return useQuery({
    queryKey: qk.device(deviceId),
    queryFn: () => getDevice(deviceId),
    staleTime: 60_000,
  });
};

export const useUpsertDeviceMutation = () => {
  const qc = useQueryClient();
  const deviceId = getOrCreateDeviceId();

  return useMutation({
    mutationFn: (payload: Partial<DeviceDoc>) =>
      upsertDevice({ device_id: deviceId, ...payload }),
    onSuccess: (data: DeviceDoc) => {
      qc.setQueryData(qk.device(deviceId), data);
    },
  });
};