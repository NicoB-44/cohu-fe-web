import React from "react";
import { Button, ButtonProps } from "@mui/material";

export const LoadMoreButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button variant="outlined" size="small" sx={{ borderRadius: 999, px: 2 }} {...props}>
    {children}
  </Button>
);
