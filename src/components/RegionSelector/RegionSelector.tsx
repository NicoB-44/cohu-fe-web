import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRegion } from "@CONTEXTS/RegionContext";
import { validRegions } from "@CONSTANTS/regions";
import { useTranslation } from "react-i18next";

export default function RegionSelector() {
  const region = useRegion();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getRegionLabel = (code: string): string => {
    return `REGION.${code}`;
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedRegion = event.target.value;
    navigate(`/${selectedRegion}`);
  };

  return (
    <FormControl  size="small">
      <InputLabel id="region-select-label">{t("REGION.SELECT")}</InputLabel>
      <Select
        labelId="region-select-label"
        value={region}
        displayEmpty
        onChange={handleChange}
        label={t(getRegionLabel(region))}
      >
        {validRegions.map((code) => (
          <MenuItem key={code} value={code}>
            {t(getRegionLabel(code))}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
