import { useParams, Navigate } from "react-router-dom";
import { RegionContext } from "../contexts/RegionContext";
import { ReactNode } from "react";
import { DEFAULT_REGION, validRegions } from "@CONSTANTS/regions";

const isValidRegion = (region: string): boolean => {
  return validRegions.includes(region);
};

export default function RegionProvider({ children }: { children: ReactNode }) {
  const { region } = useParams();

  if (!region || !isValidRegion(region)) {
    return <Navigate to={`/cohu-fe-web/${DEFAULT_REGION}`} replace />;
  }

  return (
    <RegionContext.Provider value={{ region }}>
      {children}
    </RegionContext.Provider>
  );
}