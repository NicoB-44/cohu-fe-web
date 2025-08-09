import BuyMeACoffeeButton from "@COMPONENTS/BuyMeACoffeeButton/BuyMeACoffeeButton";
import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        backgroundColor: "grey.100",
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
        gap: { xs: 1, sm: 0 },
      }}
    >
      {/* Left */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Nicolas B. All rights reserved.
        </Typography>
      </Box>

      {/* Center */}
      <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "center" } }}>
        <Link
          href="https://forms.gle/gnpnYaU1RAyxfVeu6"
          target="_blank"
          rel="noopener"
          variant="body2"
          color="primary"
          underline="hover"
        >
          Contact Us
        </Link>
      </Box>

      {/* Right */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <BuyMeACoffeeButton />
      </Box>
    </Box>
  );
};

export default Footer;
