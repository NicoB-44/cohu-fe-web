import ProductCard from "@COMPONENTS/ProductCard/ProductCard";
import { useRegion } from "@CONTEXTS/RegionContext";
import useProductListQuery from "@HOOKS/useProductListQuery";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const ProductList = () => {
  const { t } = useTranslation();
  const region = useRegion();
  const { data, isLoading, error } = useProductListQuery(region);

  if (isLoading) {
    return <div>{t("DROP_HISTORY.LOADING")}</div>;
  }
  if (error) {
    return <div>{t("DROP_HISTORY.ERROR", { message: error.message })}</div>;
  }
  if (!data?.length) {
    return <div>{t("DROP_HISTORY.NO_DATA")}</div>;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ padding: 2 }}
        gap={2} // spacing between cards
      >
        {data.map((product) => (
          <ProductCard
            key={product.productId}
            title={product.productName}
            price={product.productPrice}
            imageUrl={product.productImage}
            buyUrl={""}
            available={product.cohuAvailability.available}
          />
        ))}
      </Box>
    </>
  );
};

export default ProductList;
