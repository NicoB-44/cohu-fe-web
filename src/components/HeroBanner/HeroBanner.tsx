import { Typography, Stack, Paper, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import imgSrc from "@ASSETS/heroPic.png";
import BuyMeACoffeeButton from "@COMPONENTS/BuyMeACoffeeButton/BuyMeACoffeeButton";
export default function HeroBanner() {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#f5f5f5",
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
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2} textAlign={{ xs: "center", md: "left" }} alignItems={{ xs: "center", md: "flex-start" }}>
            <Typography variant="h5" fontWeight="bold">
              {t("HERO.TITLE")}
            </Typography>

            <Typography variant="h5" color="text.secondary">
              {t("HERO.SUBTITLE")}
            </Typography>

            <Typography variant="body1" color="text.primary" maxWidth={600}>
              {t("HERO.TEXT")}
            </Typography>


            <BuyMeACoffeeButton />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
