import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchRolePermissions,
  fetchRoles,
} from "../../../store/Reducers/UserReducers";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ListView from "../../../components/ModulePage/ListView";
import {
  rolePermissionColumns,
  rolePermissionRow,
} from "../../../Constants/MUIDataTableColumns/UserManagement";
const RolePermissions = () => {
  const dispatch = useAppDispatch();

  const params = useParams();

  const id = params.id as unknown as number;
  const { rolePermissions, roles } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchRolePermissions({ roleId: id }));
    if (roles.length === 0) {
      dispatch(fetchRoles({ roleId: id }));
    }
  }, [id, dispatch, roles.length, rolePermissions.length]);

  const role = roles.find((role) => role.id === Number(id));

  const rows =
    rolePermissions.length > 0 &&
    rolePermissions.map((permission) => rolePermissionRow(permission));

  return (
    <>
      {role ? (
        <>
          {rolePermissions.length > 0 && roles.length > 0 && rows ? (
            <>
              <ListView
                columns={rolePermissionColumns}
                rows={rows}
                isServerPagination={false}
                onRowSelect={() => {}}
                rowOnClick={() => {}}
                toolBar={null}
                isServerSideSort={false}
                onSortModelChange={() => {}}
                columnVisibilityModel={{}}
                checkboxSelection={false}
                isLoading={false}
                toolBarProps={{
                  moduleName: role.name,
                  showBackButton: true,
                }}
              />
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default RolePermissions;
