import useDropHistoryQuery from "@HOOKS/useDropHistoryQuery";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { dropHistoryMock } from "../../mocks/dropHistory.mock";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const DropHistory = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useDropHistoryQuery();
  
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: t("DROP_HISTORY.ID"), width: 90 },
      { field: "productName", headerName: t("DROP_HISTORY.NAME"), width: 150 },
      { field: "productCountry", headerName: t("DROP_HISTORY.COUNTRY"), width: 150 },
      { field: "dropStart", headerName: t("DROP_HISTORY.START_DATE"), width: 150 },
      { field: "dropEnd", headerName: t("DROP_HISTORY.END_DATE"), width: 150 },
      { field: "dropDuration", headerName: t("DROP_HISTORY.DURATION"), width: 150 },
    ],
    [t]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.length) {
    return <div>No data available</div>;
  }

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
    <h2>{t("DROP_HISTORY.TITLE")}</h2>
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        showToolbar
      />
    </Paper>
    </>
  );
}
export default DropHistory;
