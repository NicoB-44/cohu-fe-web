import { Header } from "@COMPONENTS";
import { Box } from "@mui/material";
import RegionProvider from "@PROVIDERS/RegionProvider";
import imgSrc from "@ASSETS/NotFound.png";

const NotFound = () => {
  return (
    <RegionProvider>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ flex: 1 }} // fill remaining space provided by the page layout
      >
        <Header />

        {/* <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
          {t("ERRORS.NOT_FOUND")}
        </Typography> */}

        <Box
          component="img"
          src={imgSrc}
          alt="Not Found"
          sx={{
            mt: "auto",          // stick to bottom of this column
            width: "100%",
            maxHeight: 300,
            objectFit: "contain"
          }}
        />
      </Box>
    </RegionProvider>
  );
};

export default NotFound;
