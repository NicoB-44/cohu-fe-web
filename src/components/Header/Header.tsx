import LocaleSwitch from "@COMPONENTS/LocaleSwitch";
import RegionSelector from "@COMPONENTS/RegionSelector";
import HomeButton from "@COMPONENTS/HomeButton/HomeButton";
import { Box, Typography, IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { yellow } from "@mui/material/colors";

const Header = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={1}
      sx={{ width: "100%", backgroundColor: yellow[500], borderBottom: `1px solid ${yellow[300]}` }}
    >
      <Box display="flex" alignItems="center" gap={2} minWidth={0}>
        <HomeButton />
        <Typography variant="h5" component="h1" noWrap>
          {t("HEADER.TITLE")}
        </Typography>
      </Box>

      {/* Desktop / tablet (sm+) inline controls */}
      <Box display={{ xs: "none", sm: "flex" }} alignItems="center" gap={2}>
        <LocaleSwitch />
        <RegionSelector />
      </Box>

      {/* Mobile (xs) burger */}
      <Box display={{ xs: "flex", sm: "none" }} alignItems="center">
        <IconButton
          aria-label={t("HEADER.MENU_ARIA") || "Open menu"}
          aria-controls={open ? "header-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
          size="large"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="header-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
        >
          <Box px={2} py={1} display="flex" flexDirection="column" gap={1.5}>
            <LocaleSwitch />
            <RegionSelector />
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
