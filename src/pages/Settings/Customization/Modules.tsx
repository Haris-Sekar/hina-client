import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchModuleCount,
  fetchModules,
} from "../../../store/Thunks/CustomizationThunks";
import ModulePage from "../../../components/ModulePage/ModulePage";
import {
  moduleListView,
  moduleListViewRow,
} from "../../../Constants/MUIDataTableColumns/Modules";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { Box, Divider, Typography } from "@mui/material";

const Modules = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchModuleCount());
    dispatch(fetchModules({ page: 0, range: 25 }));
  }, [dispatch]);

  const { modules, loading, moduleCount } = useAppSelector(
    (state) => state.customization
  );

  const rows =
    modules.length > 0 && modules.map((module) => moduleListViewRow(module));

  function onPaginationModelChange(e: GridPaginationModel) {
    dispatch(
      fetchModules({
        page: e.page,
        range: e.pageSize,
      })
    );
  }

  const onSortModelChange = (e: GridSortModel) => {
    const sortObj = e[0];
    if (sortObj && sortObj.sort) {
      let fieldName = sortObj.field;
      const sortOrder = sortObj.sort.toUpperCase();
      if (sortObj.field === "name") {
        fieldName = "name";
      }
      if (sortObj.field === "createdTime") {
        fieldName = "created_time";
      }
      if (sortObj.field === "updatedTime") {
        fieldName = "updated_time";
      }
      dispatch(
        fetchModules({ sortBy: fieldName, sortOrder, page: 0, range: 25 })
      );
    } else {
      dispatch(fetchModules({ page: 0, range: 25 }));
    }
  };

  return (
    <>
      <Box
        sx={{
          p: "10px",
          position: "sticky",
          top: 0,
          paddingLeft: 2,
          zIndex: 999,
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
          Modules
        </Typography>
      </Box>
      <Divider />
      <ModulePage
        moduleName="Modules"
        rowCount={moduleCount}
        rows={rows}
        columns={moduleListView}
        isLoading={loading}
        isServerPagination={true}
        onPaginationModelChange={onPaginationModelChange}
        addCallBack={() => {}}
        editCallBack={() => {}}
        deleteCallBack={() => {}}
        isServerSideSort={true}
        onSortModelChange={onSortModelChange}
        columnVisibilityModel={{}}
        checkboxSelection={false}
        hasBulkEdit={false}
        hasBulkDelete={false}
        hasAdd={false}
      />
    </>
  );
};

export default Modules;
