import React, { useMemo, useState, useEffect } from "react";
import { Stack, Alert, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRegion } from "@CONTEXTS/RegionContext";
import useDropHistoryQuery from "@HOOKS/useDropHistoryQuery";
import useProductListQuery from "@HOOKS/useProductListQuery";
import { Drop, Product } from "@TYPES/api";

import { FilterBar } from "./FilterBar";
import { DropHistoryList } from "./DropHistoryList";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { LoadMoreButton } from "./LoadMoreButton";

export interface DropHistoryProps { pageSize?: number }

export const DropHistory: React.FC<DropHistoryProps> = ({ pageSize = 10 }) => {
  const { t } = useTranslation();
  const region = useRegion();
  const { data, isLoading, error } = useDropHistoryQuery(region);
  const { data: productList } = useProductListQuery(region);

  const productById = useMemo(() => {
    const m = new Map<string, Product>();
    productList?.forEach((p) => m.set(p.productId, p));
    return m;
  }, [productList]);

  const [visible, setVisible] = useState(pageSize);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const allProducts = useMemo(
    () => Array.from(new Set((data ?? []).map((d: Drop) => d.productName))).sort(),
    [data]
  );

  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setVisible(pageSize);
    setSelectedProducts(() => new Set(allProducts));
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
      if (next.has(p)) {
        next.delete(p);
      } else {
        next.add(p);
      }
      return next;
    });
  };

  const handleSelectAll = () => setSelectedProducts(new Set(allProducts));
  const handleClearAll = () => setSelectedProducts(new Set());

  return (
    <Stack sx={{ width: "80%" }}>
      <FilterBar
        sortDir={sortDir}
        onToggleSort={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
        products={allProducts}
        selectedProducts={selectedProducts}
        onToggleProduct={toggleProduct}
        onSelectAll={handleSelectAll}
        onClearAll={handleClearAll}
        disabled={isLoading}
      />

      {error && (
        <Alert severity="error">{t("DROP_HISTORY.FAILED_TO_LOAD")} {String(error)}</Alert>
      )}

      {isLoading ? (
        <LoadingSkeleton count={pageSize} />
      ) : filteredSorted.length === 0 ? (
        <EmptyState label={t("DROP_HISTORY.NO_DROPS_FOUND")} />
      ) : (
        <DropHistoryList
          items={visibleItems}
          productById={productById}
          region={region}
        />
      )}

      {!isLoading && canLoadMore && (
        <Box textAlign="center">
          <LoadMoreButton onClick={() => setVisible((v) => v + pageSize)}>
            {t("DROP_HISTORY.LOAD_MORE")}
          </LoadMoreButton>
        </Box>
      )}
    </Stack>
  );
};

export default DropHistory;
