import { Header, HeroBanner, ProductList } from "@COMPONENTS";
import DropHistory from "@COMPONENTS/DropHistory";
import { TestNotificationButton } from "@COMPONENTS/TestNotificationButton/TestNotificationButton";
import Tips from "@COMPONENTS/Tips/Tips";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ alignItems: "center" }}
    >
      <Header />
      <HeroBanner />
      <Box my={1} />
      <ProductList />
      <TestNotificationButton />
      <Box my={1} />
      <Tips />
      <Box my={2} />
      <DropHistory />
    </Box>
  );
};

export default Home;