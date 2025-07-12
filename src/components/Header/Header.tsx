import LocaleSwitch from "@COMPONENTS/LocaleSwitch";
import RegionSelector from "@COMPONENTS/RegionSelector";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import HomeButton from "@COMPONENTS/HomeButton/HomeButton";

const Header = () => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} sx={{ alignItems: "center"}}>
      <HomeButton />
      <h1>{t("HEADER.TITLE")}</h1>
      <LocaleSwitch />
      <RegionSelector />
    </Grid>
  );
};
export default Header;
