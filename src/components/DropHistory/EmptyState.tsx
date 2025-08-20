import React from "react";
import { Paper, Typography } from "@mui/material";

export const EmptyState: React.FC<{ label: string }> = ({ label }) => (
  <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderStyle: "dashed" }}>
    <Typography variant="body1" color="text.secondary">{label}</Typography>
  </Paper>
);
