import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchRoles } from "../../../store/Reducers/UserReducers";
import { Box, Divider, Typography } from "@mui/material";
import ModulePage from "../../../components/ModulePage/ModulePage";
import {
  roleColumn,
  roleListViewRow,
} from "../../../Constants/MUIDataTableColumns/UserManagement";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
const Roles = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoles({}));
  }, [dispatch]);

  const { roles, loading, roleCount } = useAppSelector((state) => state.user);

  const rows = roles && roles.map((role) => roleListViewRow(role));

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
        fetchRoles({ sortBy: fieldName, sortOrder, page: 0, range: 25 })
      );
    } else {
      dispatch(fetchRoles({ page: 0, range: 25 }));
    }
  };
  function onPaginationModelChange(e: GridPaginationModel) {
    dispatch(
      fetchRoles({
        page: e.page,
        range: e.pageSize,
      })
    );
  }

  return (
    <>
      {roles && roles.length > 0 ? (
        <ModulePage
          moduleName="Roles & Permission"
          rowCount={roleCount}
          isLoading={loading}
          isServerPagination
          columns={roleColumn}
          rows={rows}
          addCallBack={() => {}}
          deleteCallBack={() => {}}
          editCallBack={() => {}}
          hasAdd={false}
          onPaginationModelChange={onPaginationModelChange}
          onSortModelChange={onSortModelChange}
          isServerSideSort={true}
          checkboxSelection={false}
          hasBulkEdit={false}
          hasBulkDelete={false}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Roles;
