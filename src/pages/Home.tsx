import { DropHistory, Header, HeroBanner, ProductList } from "@COMPONENTS";
import Tips from "@COMPONENTS/Tips/Tips";
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
      <Tips />
      <DropHistory />
    </Box>
  );
};

export default Home;