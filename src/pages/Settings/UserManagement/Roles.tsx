import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
    fetchRoles,
} from "../../../store/Reducers/UserReducers";
import { Avatar, Box, Chip, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { getRandomColor } from "../../../Constants/DataTableColumn";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
const Roles = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRoles({}));
    }, [dispatch]);

    const { roles } = useAppSelector((state) => state.user);

    const navigate = useNavigate();

    return (
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
                    }}
                >
                    <Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
                        Role & Permissions
                    </Typography>
                </Box>
                <Divider />

                {roles.length > 0 &&
                    roles.map((role) => (
                        <Box
                            sx={{
                                cursor: "pointer",
                                ":hover": { backgroundColor: "background.paper" },
                                userSelect: 'none'
                            }}
                            onClick={() => navigate(`/app/settings/roles/${role.id}`)}
                        >
                            <Box
                                key={role.id}
                                sx={{
                                    display: "flex",
                                    gap: "20px",
                                    margin: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: getRandomColor(role.id),
                                        width: "46px",
                                        height: "46px",
                                    }}
                                >
                                    <Typography
                                        sx={{ fontSize: "22px", color: "white" }}
                                    >
                                        {role.name
                                            .split(" ")
                                            .map((word) => word.charAt(0) + word.charAt(1))
                                            .join("")
                                            .toUpperCase()}
                                    </Typography>
                                </Avatar>
                                <Box>
                                    <Typography sx={{ fontSize: "17px", fontWeight: "bolder" }}>{role.name}</Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {role.description}
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    {role.isDefault && <Chip label="Default" color="primary" />}
                                </Stack>
                                <Box sx={{ marginLeft: "auto" }}>
                                    <Stack direction="row" spacing={1} key={role.id}>
                                        <Tooltip title="Edit" arrow>
                                            <IconButton sx={{ ":hover": { color: "secondary.main" } }}>
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <IconButton sx={{ ":hover": { color: "secondary.main" } }}>
                                                <DeleteOutlineOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ))}
            </Box>
        </>
    );
};

export default Roles;
