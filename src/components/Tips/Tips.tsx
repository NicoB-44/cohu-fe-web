import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { orange, yellow } from "@mui/material/colors";
import logoSrc from "@ASSETS/CohuLogo.png";
import qrSrc from "@ASSETS/QRCode.png";
import { useTranslation } from "react-i18next";

const Tips: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        borderRadius: 4,
        border: 2,
        borderColor: orange[500],
        bgcolor: yellow[200],
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        mx: { xs: 2 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          // stack on small screens
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        {/* Left: Logo */}
        <Box
          component="img"
          src={logoSrc}
          sx={{
            width: { xs: 40, sm: 56 },
            height: { xs: 40, sm: 56 },
            objectFit: "contain",
          }}
        />

        {/* Middle: Text */}
        <Typography
          variant="subtitle1"
          sx={{
            flex: 1,
            fontWeight: 700,
            textAlign: { xs: "center", sm: "left" },
            lineHeight: 1.35,
          }}
        >
          {t("TIPS.TEXT")}
        </Typography>

        {/* Right: QR code */}
        <Box
          component="img"
          src={qrSrc}
          sx={{
            width: { xs: 72, sm: 96 },
            height: { xs: 72, sm: 96 },
            objectFit: "contain",
            ml: { sm: "auto" },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Tips;
