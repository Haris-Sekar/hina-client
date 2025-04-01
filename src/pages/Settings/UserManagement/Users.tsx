import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
    fetchUserCount,
    fetchUsers,
} from "../../../store/Reducers/UserReducers";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { createUserRow } from "../../../Constants/DataTableColumn";
import { useNavigate } from "react-router-dom";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { userColDef } from "../../../Constants/MUIDataTableColumns/UserManagement";

const Users = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers({
            page: 0,
            range: 25
        }));
        dispatch(fetchUserCount());
    }, [dispatch]);

    const { users, loading, userCount } = useAppSelector((state) => state.user);

    const rows = users && users.map((user) => createUserRow(user));

    const navigate = useNavigate();

    const addCallback = () => {
        navigate("/app/settings/users/add");
    };

    function onPaginationModelChange(e: GridPaginationModel) {
        dispatch(
          fetchUsers({
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
            fetchUsers({ sortBy: fieldName, sortOrder, page: 0, range: 25 })
          );
        } else {
          dispatch(fetchUsers({ page: 0, range: 25 }));
        }
      };

    return (
        <>
            <ModulePage
                moduleName="Users"
                rowCount={userCount}
                rows={rows}
                columns={userColDef}
                isLoading={loading}
                isServerPagination={true}
                addCallBack={addCallback}
                editCallBack={() => { }}
                deleteCallBack={() => { }}
                isServerSideSort={true}
                onSortModelChange={onSortModelChange}
                columnVisibilityModel={{}}
                checkboxSelection={false}
                hasBulkEdit={false}
                hasBulkDelete={false}
                hasAdd={true}
                onPaginationModelChange={onPaginationModelChange}
            />
        </>
    );
};

export default Users;
