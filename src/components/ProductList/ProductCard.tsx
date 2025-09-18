import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  Box,
  CardMedia,
  Link,
  CircularProgress,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { useDeviceQuery, useUpsertDeviceMutation } from "@HOOKS/useDeviceQuery";
import { useBootstrapNotifications } from "@HOOKS/useBootstrapNotification";

type ProductCardProps = {
  title: string;
  price: string;
  imageUrl: string;
  buyUrl: string;
  available: boolean;
  lastDrop?: string;
  productId?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  buyUrl,
  available,
  lastDrop,
  productId,
}) => {
  const { t } = useTranslation();
  const { data: device, isLoading } = useDeviceQuery();
  const upsert = useUpsertDeviceMutation();
  const { bootstrap } = useBootstrapNotifications();

  const pid = productId ?? title;

  const notificationEnabled = Boolean(
    device?.products?.[pid]?.includes("push")
  );

  const handleCardClick = () => {
    window.open(buyUrl, "_blank");
  };

  const handleToggle = async (next: boolean) => {
    // Prevent opening the buy link when toggling (handled on the Box as well)
    const currentProducts = { ...(device?.products ?? {}) };

    if (next) {
      await bootstrap();
      currentProducts[pid] = ["push"];
    } else {
      delete currentProducts[pid];
    }

    try {
      await upsert.mutateAsync({ products: currentProducts });
    } catch {
      // no-op here; you can plug a Snackbar/Alert if you want
    }
  };

  return (
    <Card
      sx={{
        width: 240,
        border: 2,
        borderColor: available ? "success.main" : "grey.400",
        bgcolor: available ? green[200] : "grey.100",
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
    >
      <div onClick={handleCardClick}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {price}
          </Typography>

          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{ height: 120, objectFit: "contain", mb: 2 }}
          />

          {available ? (
            <>
              <Typography color="success.main" fontWeight="bold">
                {t("PRODUCT_CARD.AVAILABLE")}
              </Typography>
              <Button
                variant="contained"
                color="success"
                href={buyUrl}
                target="_blank"
                sx={{ mt: 2 }}
                onClick={(e) => e.stopPropagation()} // prevents double opening
              >
                {t("PRODUCT_CARD.BUY")}
              </Button>
            </>
          ) : (
            <>
              <Typography color="text.secondary" fontWeight="bold">
                {t("PRODUCT_CARD.UNAVAILABLE")}
              </Typography>

              {lastDrop && (
                <Typography variant="body2" color="text.secondary">
                  {t("PRODUCT_CARD.LAST_DROP")}: {lastDrop}
                </Typography>
              )}

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
                onClick={(e) => e.stopPropagation()} // avoid opening buy link when toggling
                gap={1}
              >
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => handleToggle(!notificationEnabled)}
                  sx={{ color: "primary.dark", mr: 1 }}
                  disabled={isLoading || upsert.isPending}
                >
                  {t("PRODUCT_CARD.ACTIVATE_NOTIFICATION")}
                </Link>

                {isLoading || upsert.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  <Switch
                    color="primary"
                    checked={notificationEnabled}
                    onChange={(_, checked) => handleToggle(checked)}
                  />
                )}
              </Box>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
