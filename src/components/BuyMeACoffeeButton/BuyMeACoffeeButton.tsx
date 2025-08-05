import { Button } from "@mui/material";

export default function BuyMeACoffeeButton() {
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
      ☕ Buy me a coffee
    </Button>
  );
}
