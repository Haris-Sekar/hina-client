import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
    fetchRolePermissions,
    fetchRoles,
} from "../../../store/Reducers/UserReducers";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import ListView from "../../../components/ModulePage/ListView";
import { rolePermissionColumns, rolePermissionRow } from "../../../Constants/MUIDataTableColumns/UserManagement";
const RolePermissions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const params = useParams();

    const id = params.id as unknown as number;
    const { rolePermissions, roles } = useAppSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(fetchRolePermissions({ roleId: id }));
        if (roles.length === 0) {
            dispatch(fetchRoles({ roleId: id }));
        }
    }, [id, dispatch, roles.length, rolePermissions.length]);

    const role = roles.find((role) => role.id === Number(id));

    const rows = rolePermissions.length > 0 && rolePermissions.map((permission) => rolePermissionRow(permission));

    return (
        <>
            {role ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                p: "10px",
                                position: "sticky",
                                top: 0,
                                paddingLeft: 2,
                                zIndex: 999,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Tooltip title="Back" arrow>
                                <IconButton onClick={() => navigate("/app/settings/roles")}>
                                    <ArrowBackOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
                                {role.name}
                            </Typography>
                        </Box>
                        <Divider />
                    </Box>

                    {rolePermissions.length > 0 && roles.length > 0 && rows ? (
                        <>
                            <ListView
                                columns={rolePermissionColumns}
                                rows={rows}
                                isServerPagination={false}
                                onRowSelect={() => { }}
                                rowOnClick={() => { }}
                                toolBar={null}
                                isServerSideSort={false}
                                onSortModelChange={() => { }}
                                columnVisibilityModel={{}}
                                checkboxSelection={false}
                                isLoading={false}
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
