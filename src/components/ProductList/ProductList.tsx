import ProductCard from "./ProductCard";
import { useRegion } from "@CONTEXTS/RegionContext";
import useProductListQuery from "@HOOKS/useProductListQuery";
import { useTranslation } from "react-i18next";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

const ProductList = () => {
  const { t } = useTranslation();
  const region = useRegion();
  const { data, isLoading, error } = useProductListQuery(region);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ padding: 2 }}
        gap={2}
      >
        {[...Array(3)].map((_, index) => (
          <Card key={index} sx={{ width: 240 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton width="70%" />
              <Skeleton width="30%" />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return <div>{t("DROP_HISTORY.ERROR", { message: error.message })}</div>;
  }

  if (!data?.length) {
    return <div>{t("DROP_HISTORY.NO_DATA")}</div>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      sx={{ padding: 2 }}
      gap={2}
    >
      {data.map((product) => (
        <ProductCard
          key={product.productId}
          title={product.productName}
          price={product.productPrice}
          imageUrl={product.productImage}
          buyUrl={product.productURL}
          available={product.cohuAvailability?.available}
          productId={product.productId}
        />
      ))}
    </Box>
  );
};

export default ProductList;
