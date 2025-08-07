import { Typography, Stack, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import imgSrc from "@ASSETS/HeroPic.png";
import BuyMeACoffeeButton from "@COMPONENTS/BuyMeACoffeeButton/BuyMeACoffeeButton";
import { yellow } from "@mui/material/colors";
export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: yellow[100],
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left column: Image */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            component="img"
            src={imgSrc}
            alt="Hero"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              mx: "auto",
            }}
          />
        </Grid>

        {/* Right column: Text content */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ p: 2 }}>
          <Stack spacing={2} textAlign={{ xs: "center", md: "left" }} alignItems={{ xs: "center", md: "flex-start" }}>
            <Typography variant="h5" fontWeight="bold">
              {t("HERO.TITLE")}
            </Typography>

            <Typography variant="body1" color="text.primary" maxWidth={600} sx={{ whiteSpace: "pre-line" }}>
              {t("HERO.TEXT")}
            </Typography>


            <BuyMeACoffeeButton />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
