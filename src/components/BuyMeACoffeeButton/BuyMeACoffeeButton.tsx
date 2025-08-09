import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function BuyMeACoffeeButton() {
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#fa932b",
        color: "#000000",
        fontFamily: "Cookie, cursive",
        textTransform: "none",
        fontSize: "1.2rem",
        px: 3,
        py: 1,
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#e17f1c",
        },
      }}
      href="https://buymeacoffee.com/cohuRTXFE"
      target="_blank"
      rel="noopener noreferrer"
    >
      ☕ {t("BUTTON.BUY_ME_A_COFFEE")}
    </Button>
  );
}
