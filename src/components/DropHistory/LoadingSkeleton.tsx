import React from "react";
import { List, ListItem, Box, Skeleton } from "@mui/material";

export const LoadingSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <List sx={{ m: 0, width: "100%" }}>
    {Array.from({ length: count }).map((_, i) => (
      <ListItem key={i} sx={{ px: 0 }}>
        <Box sx={{ borderRadius: 3, flex: 1 }}>
          <Skeleton animation="wave" variant="rectangular" height={52} sx={{ borderRadius: 2 }} />
        </Box>
      </ListItem>
    ))}
  </List>
);
