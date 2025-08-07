import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  Box,
  CardMedia,
  Link,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

type ProductCardProps = {
  title: string;
  price: string;
  imageUrl: string;
  buyUrl: string;
  available: boolean;
  lastDrop?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  buyUrl,
  available,
  lastDrop,
}) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        width: 240,
        border: 2,
        borderColor: available ? "success.main" : "grey.400",
        bgcolor: available ? green[200] : "grey.100",
        textAlign: "center",
      }}
    >
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
            >
              <Link
                component="button"
                underline="hover"
                onClick={() => setNotificationEnabled((prev) => !prev)}
                sx={{ color: "primary.dark", mr: 1 }}
              >
                {t("PRODUCT_CARD.ACTIVATE_NOTIFICATION")}
              </Link>
              <Switch
                color="primary"
                checked={notificationEnabled}
                onChange={() => setNotificationEnabled((prev) => !prev)}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};


export default ProductCard;