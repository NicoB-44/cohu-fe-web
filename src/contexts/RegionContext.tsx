import { createContext, useContext } from "react";

interface RegionContextValue {
  region: string;
}

export const RegionContext = createContext<RegionContextValue | undefined>(undefined);

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context.region;
};
