import { Header, HeroBanner } from "@COMPONENTS";
import { Box } from "@mui/material";

const TestPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ alignItems: "center" }}
    >
      <Header />
      <HeroBanner />
      {"TEST PAGE"}
    </Box>
  );
};

export default TestPage;