import React from "react";
import { ListItem, ButtonBase, Box, Stack, ListItemAvatar, Avatar, Typography, Chip } from "@mui/material";
import Flag from "react-world-flags";
import productImg from "@ASSETS/ProductPlaceholder.png";
import { formatDate, formatDuration } from "@UTILS/utils";
import { Drop, Product } from "@TYPES/api";

export interface DropHistoryItemProps {
  drop: Drop;
  product?: Product;
  region: string;
}

export const DropHistoryItem: React.FC<DropHistoryItemProps> = ({ drop: d, product, region }) => {
  const url = product?.productURL || null;
  const imgSrc = product?.productImage || productImg;

  return (
    <ListItem disableGutters sx={{ px: 0 }}>
      <ButtonBase
        onClick={() => url && window.open(url, "_blank", "noopener")}
        disabled={!url}
        sx={{
          width: "100%",
          textAlign: "left",
          borderRadius: 3,
          p: 0,
          "&:disabled": { opacity: 0.9, cursor: "default" },
        }}
        aria-label={url ? `${d.productName} – open product` : `${d.productName}`}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            width: "100%",
            bgcolor: (theme) => theme.palette.action.hover,
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
            ...(url && {
              "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
              "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", transform: "translateY(-2px)", boxShadow: 4 },
              cursor: "pointer",
            }),
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%" }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 1, sm: 2 }}
                sx={{ minWidth: 0, textAlign: { xs: "center", md: "left" } }}
              >
                <ListItemAvatar sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={imgSrc} variant="rounded" sx={{ width: 40, height: 40 }} imgProps={{ referrerPolicy: "no-referrer" }} />
                </ListItemAvatar>

                <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ width: 200, flexShrink: 0 }} title={d.productName}>
                  {d.productName}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ width: 80 }}>
                  <Flag code={d.productCountry} height="16" />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {d.productCountry.toUpperCase()}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary" noWrap sx={{ width: 100, textAlign: "center" }}>
                  {formatDate(d.dropStart, region)}
                </Typography>

                <Chip size="small" sx={{ width: 150 }} label={formatDuration(d.dropDuration)} />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </ButtonBase>
    </ListItem>
  );
};
