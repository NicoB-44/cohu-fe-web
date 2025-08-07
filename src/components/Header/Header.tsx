import LocaleSwitch from "@COMPONENTS/LocaleSwitch";
import RegionSelector from "@COMPONENTS/RegionSelector";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HomeButton from "@COMPONENTS/HomeButton/HomeButton";
import { yellow } from "@mui/material/colors";

const Header = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={1}
      sx={{ backgroundColor: yellow[500], borderBottom: `1px solid ${yellow[300]}` }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <HomeButton />
        <Typography variant="h5" component="h1">
          {t("HEADER.TITLE")}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <LocaleSwitch />
        <RegionSelector />
      </Box>
    </Box>
  );
};

export default Header;
