import { DropHistory, Header, HeroBanner, ProductList } from "@COMPONENTS";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Header />
      <HeroBanner />
      <ProductList />
      <DropHistory />
    </Box>
  );
};

export default Home;