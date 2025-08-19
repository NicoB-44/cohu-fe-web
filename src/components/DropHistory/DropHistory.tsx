import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Menu,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  ButtonBase,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRegion } from "@CONTEXTS/RegionContext";
import useDropHistoryQuery from "@HOOKS/useDropHistoryQuery";
import productImg from "@ASSETS/ProductPlaceholder.png";
import Flag from "react-world-flags";
import { formatDate, formatDuration } from "@UTILS/utils";
import useProductListQuery from "@HOOKS/useProductListQuery";
import { Drop, Product } from "@TYPES/api";

export interface DropHistoryProps {
  pageSize?: number;
}

const EmptyState: React.FC<{ label: string }> = ({ label }) => (
  <Paper
    variant="outlined"
    sx={{ p: 4, textAlign: "center", borderStyle: "dashed" }}
  >
    <Typography variant="body1" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

export const DropHistory: React.FC<DropHistoryProps> = ({ pageSize = 10 }) => {
  const { t } = useTranslation();
  const region = useRegion();
  const { data, isLoading, error } = useDropHistoryQuery(region);

  // productList may be an array or an object keyed by productId
  const { data: productList } = useProductListQuery(region);

  // Build a map for quick lookup by productId
  const productById = useMemo(() => {
    const m = new Map<string, Product>();
    productList?.forEach((p) => m.set(p.productId, p));
    return m;
  }, [productList]);

  const [visible, setVisible] = useState(pageSize);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const allProducts = useMemo(
    () => Array.from(new Set((data ?? []).map((d: Drop) => d.productName))).sort(),
    [data]
  );

  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    () => new Set()
  );

  React.useEffect(() => {
    setVisible(pageSize);
    setSelectedProducts(() => {
      const next = new Set<string>();
      allProducts.forEach((p) => next.add(p));
      return next;
    });
  }, [allProducts, region, pageSize]);

  const filteredSorted = useMemo(() => {
    const base = (data ?? []).filter((d: Drop) => selectedProducts.has(d.productName));
    base.sort((a: Drop, b: Drop) => {
      const da = new Date(a.dropStart).getTime();
      const db = new Date(b.dropStart).getTime();
      return sortDir === "asc" ? da - db : db - da;
    });
    return base;
  }, [data, selectedProducts, sortDir]);

  const visibleItems = filteredSorted.slice(0, visible);
  const canLoadMore = visible < filteredSorted.length;

  const toggleProduct = (p: string) => {
    setSelectedProducts((set) => {
      const next = new Set(set);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const allSelected = selectedProducts.size === allProducts.length;
  const noneSelected = selectedProducts.size === 0;

  const handleSelectAll = () => {
    setSelectedProducts(new Set(allProducts));
  };

  const handleClearAll = () => {
    setSelectedProducts(new Set());
  };

  return (
    <Stack sx={{ width: "80%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t("DROP_HISTORY.TITLE")}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title={t("DROP_HISTORY.FILTER_BY_PRODUCT")}>
            <IconButton
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label="filter"
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${t("DROP_HISTORY.SORT_BY_DATE")} (${sortDir.toUpperCase()})`}>
            <span>
              <IconButton
                size="small"
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                aria-label="sort"
                disabled={isLoading}
              >
                <CalendarMonthIcon sx={{ mr: 0.5 }} />
                {sortDir === "asc" ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        {/* Filter menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{ paper: { sx: { p: 1, width: 280 } } }}
        >
          <Box sx={{ px: 1, pb: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ px: 1, pb: 1 }}
            >
              {t("DROP_HISTORY.PRODUCTS")}
            </Typography>
            <FormGroup sx={{ maxHeight: 260, overflowY: "auto", px: 1 }}>
              {allProducts.map((p) => (
                <FormControlLabel
                  key={p}
                  control={
                    <Checkbox
                      checked={selectedProducts.has(p)}
                      onChange={() => toggleProduct(p)}
                    />
                  }
                  label={p}
                />
              ))}
            </FormGroup>
            <Stack direction="row" spacing={1} sx={{ mt: 1, px: 1 }}>
              <Button size="small" onClick={handleSelectAll} disabled={allSelected}>
                {t("DROP_HISTORY.SELECT_ALL")}
              </Button>
              <Button size="small" onClick={handleClearAll} disabled={noneSelected}>
                {t("DROP_HISTORY.CLEAR")}
              </Button>
            </Stack>
          </Box>
        </Menu>
      </Stack>

      {error && (
        <Alert severity="error">
          {t("DROP_HISTORY.FAILED_TO_LOAD")} {String(error)}
        </Alert>
      )}

      {/* Loading state */}
      {isLoading ? (
        <List sx={{ m: 0, width: "100%" }}>
          {Array.from({ length: pageSize }).map((_, i) => (
            <ListItem key={i} sx={{ px: 0 }}>
              <Box sx={{ borderRadius: 3, flex: 1 }}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height={52}
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      ) : filteredSorted.length === 0 ? (
        <EmptyState label="No drops found with the current filters." />
      ) : (
        <List>
          {visibleItems.map((d: Drop) => {
            const product = productById.get(d.productId);
            const url = product?.productURL || null;
            const imgSrc = product?.productImage || productImg;

            return (
              <ListItem key={d.dropId} disableGutters sx={{ px: 0 }}>
                {/* ButtonBase makes the row clickable + keyboard accessible */}
                <ButtonBase
                  onClick={() => url && window.open(url, "_blank", "noopener")}
                  disabled={!url}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    borderRadius: 3,
                    // visual styles
                    p: 0, // padding goes to inner Box to preserve rounded corners
                    "&:disabled": { opacity: 0.9, cursor: "default" },
                  }}
                  aria-label={
                    url
                      ? `${d.productName} – open product`
                      : `${d.productName}`
                  }
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      width: "100%",
                      bgcolor: (theme) => theme.palette.action.hover,
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      // Hover / focus-visible effect on the whole row
                      ...(url && {
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 4,
                        },
                        "&:focus-visible": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          transform: "translateY(-2px)",
                          boxShadow: 4,
                        },
                        cursor: "pointer",
                      }),
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ width: "100%" }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          alignItems="center"
                          justifyContent="center"
                          spacing={{ xs: 1, sm: 2 }}
                          sx={{
                            minWidth: 0,
                            textAlign: { xs: "center", md: "left" },
                          }}
                        >
                          {/* Product image */}
                          <ListItemAvatar
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Avatar
                              src={imgSrc}
                              variant="rounded"
                              sx={{ width: 40, height: 40 }}
                              imgProps={{ referrerPolicy: "no-referrer" }}
                            />
                          </ListItemAvatar>

                          {/* Name */}
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            noWrap
                            sx={{
                              width: 200,
                              flexShrink: 0,
                            }}
                            title={d.productName}
                          >
                            {d.productName}
                          </Typography>

                          {/* Country */}
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: 80 }}
                          >
                            <Flag code={d.productCountry} height="16" />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {d.productCountry.toUpperCase()}
                            </Typography>
                          </Stack>

                          {/* Date */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ width: 100, textAlign: "center" }}
                          >
                            {formatDate(d.dropStart, region)}
                          </Typography>

                          {/* Duration */}
                          <Chip
                            size="small"
                            sx={{ width: 150 }}
                            label={formatDuration(d.dropDuration)}
                          />
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </ButtonBase>
              </ListItem>
            );
          })}
        </List>
      )}

      {/* Load More */}
      {!isLoading && canLoadMore && (
        <Box textAlign="center">
          <Button
            onClick={() => setVisible((v) => v + pageSize)}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 999, px: 2 }}
          >
            {t("DROP_HISTORY.LOAD_MORE")}
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default DropHistory;
