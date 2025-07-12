import { Typography, Button, Stack, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function HeroBanner() {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, md: 6 },
        mt: 4,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 4,
      }}
    >
      <Stack spacing={2} alignItems="center">
        {/* Main Title */}
        <Typography variant="h2" component="h1" fontWeight="bold">
          {t("HERO.TITLE")}
        </Typography>

        {/* Subtitle */}
        <Typography variant="h5" color="text.secondary">
          {t("HERO.SUBTITLE")}
        </Typography>

        {/* Info text */}
        <Typography variant="body1" color="text.primary" maxWidth={600}>
          {t("HERO.TEXT")}
        </Typography>

        {/* Donate button */}
        <Button
          variant="contained"
          color="primary"
          href="https://www.paypal.com/donate"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          {t("HERO.DONATE")}
        </Button>
      </Stack>
    </Paper>
  );
}