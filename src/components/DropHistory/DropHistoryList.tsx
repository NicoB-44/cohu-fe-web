import React from "react";
import { List } from "@mui/material";
import { Drop, Product } from "@TYPES/api";
import { DropHistoryItem } from "./DropHistoryItem";

export interface DropHistoryListProps {
  items: Drop[];
  productById: Map<string, Product>;
  region: string;
}

export const DropHistoryList: React.FC<DropHistoryListProps> = ({ items, productById, region }) => {
  return (
    <List>
      {items.map((d) => (
        <DropHistoryItem key={d.dropId} drop={d} product={productById.get(d.productId)} region={region} />
      ))}
    </List>
  );
};
