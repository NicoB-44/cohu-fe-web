import React from "react";
import { Stack, Typography, Tooltip, IconButton, Menu, Box, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";

export interface FilterBarProps {
  sortDir: "asc" | "desc";
  onToggleSort: () => void;
  products: string[];
  selectedProducts: Set<string>;
  onToggleProduct: (p: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  disabled?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortDir,
  onToggleSort,
  products,
  selectedProducts,
  onToggleProduct,
  onSelectAll,
  onClearAll,
  disabled,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const allSelected = selectedProducts.size === products.length;
  const noneSelected = selectedProducts.size === 0;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h6">{t("DROP_HISTORY.TITLE")}</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title={t("DROP_HISTORY.FILTER_BY_PRODUCT") as string}>
          <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="filter">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`${t("DROP_HISTORY.SORT_BY_DATE")} (${sortDir.toUpperCase()})`}>
          <span>
            <IconButton size="small" onClick={onToggleSort} aria-label="sort" disabled={disabled}>
              <CalendarMonthIcon sx={{ mr: 0.5 }} />
              {sortDir === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { p: 1, width: 280 } } }}
      >
        <Box sx={{ px: 1, pb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ px: 1, pb: 1 }}>
            {t("DROP_HISTORY.PRODUCTS")}
          </Typography>
          <FormGroup sx={{ maxHeight: 260, overflowY: "auto", px: 1 }}>
            {products.map((p) => (
              <FormControlLabel
                key={p}
                control={<Checkbox checked={selectedProducts.has(p)} onChange={() => onToggleProduct(p)} />}
                label={p}
              />
            ))}
          </FormGroup>
          <Stack direction="row" spacing={1} sx={{ mt: 1, px: 1 }}>
            <Button size="small" onClick={onSelectAll} disabled={allSelected}>
              {t("DROP_HISTORY.SELECT_ALL")}
            </Button>
            <Button size="small" onClick={onClearAll} disabled={noneSelected}>
              {t("DROP_HISTORY.CLEAR")}
            </Button>
          </Stack>
        </Box>
      </Menu>
    </Stack>
  );
};
