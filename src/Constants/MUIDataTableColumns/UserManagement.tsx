/* eslint-disable react-refresh/only-export-components */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { Permission, Role } from "../../Types/User";
import {
  getHeader,
  getRandomColor,
  renderDateAndTime,
  renderUser,
} from "../DataTableColumn";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";
import { useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { customToast } from "../commonFunctions";
import { useAppSelector } from "../../store/store";

const userColDef: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e);
    },
    hideable: false,
    hideSortIcons: true,
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Name"),
    renderCell: (e) => {
      return (
        <Chip
          variant="outlined"
          avatar={
            <Avatar sx={{ bgcolor: getRandomColor(Number(e.id)) }}>
              {e.value.charAt(0).toUpperCase()}
            </Avatar>
          }
          label={e.value}
        />
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Email"),
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Role"),
    renderCell: (e) => {
      return <Chip color="default" label={e.value.name} />;
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Status"),
    renderCell: (e) => {
      const color =
        e.value === "ACTIVE"
          ? e.row.isVerified
            ? "success"
            : "warning"
          : e.value === "SUSPENDED" || e.value === "INACTIVE"
            ? "error"
            : e.value === "READ_ONLY"
              ? "default"
              : "default";

      return <Chip color={color} label={e.value} />;
    },
  },
  {
    field: "isVerified",
    headerName: "Is Verified",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Is Verified"),
    renderCell: (e) => {
      return (
        <Box>
          <Chip color="default" label={e.value ? "Yes" : "No"} />
          {!e.value && (
            <Tooltip title="Re-Invite" arrow>
              <IconButton>
                <ReplayOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      );
    },
  },
  {
    field: "createdTime",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created Time"),
    hideable: true,
    renderCell: (e) => renderDateAndTime(e),
  },
  {
    field: "createdBy",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created By"),
    hideable: true,
    renderCell: (e) => renderUser(e),
  },
  {
    field: "updatedTime",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated Time"),
    hideable: true,
    renderCell: (e) => renderDateAndTime(e),
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated By"),
    renderCell: (e) => renderUser(e),
  },
];

const roleColumn: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "createdTime",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "updatedTime",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    minWidth: 200,
    flex: 1,
  },
];

const roleListViewRow = (role: Role) => {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    createdTime: role.createdTime,
    updatedTime: role.updatedTime,
    createdBy: role.createdBy,
    updatedBy: role.updatedBy,
  };
};

const renderCheckbox = (e: GridRenderCellParams) => {
  return <Checkbox checked={e.value} disabled={e.row.role.is_system_added} />;
};

const rolePermissionColumns: GridColDef[] = [
  {
    field: "module",
    headerName: "Module",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Module"),
    renderCell: (e) => {
      return <>{e.value.name}</>;
    },
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "read",
    headerName: "Read",
    maxWidth: 150,
    flex: 1,
    renderHeader: () => getHeader("Read"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
  {
    field: "create",
    headerName: "Create",
    maxWidth: 150,
    minWidth: 30,
    flex: 1,
    renderHeader: () => getHeader("Create"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
  {
    field: "update",
    headerName: "Update",
    maxWidth: 150,
    minWidth: 30,
    flex: 1,
    renderHeader: () => getHeader("Update"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
  {
    field: "delete",
    headerName: "Delete",
    maxWidth: 150,
    minWidth: 30,
    flex: 1,
    renderHeader: () => getHeader("Delete"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
  {
    field: "read_all",
    maxWidth: 150,
    headerName: "Read All",
    minWidth: 30,
    flex: 1,
    renderHeader: () => getHeader("Read All"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
  {
    field: "update_all",
    maxWidth: 150,
    headerName: "Update All",
    minWidth: 30,
    flex: 1,
    renderHeader: () => getHeader("Update All"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
  {
    field: "delete_all",
    maxWidth: 150,
    headerName: "Delete All",
    minWidth: 30,
    flex: 1,
    renderHeader: () => getHeader("Delete All"),
    sortable: false,
    disableColumnMenu: true,
    renderCell: renderCheckbox,
  },
];

const rolePermissionRow = (permission: Permission) => {
  return {
    id: permission.id,
    module: permission.module,
    read: permission.canRead,
    create: permission.canCreate,
    update: permission.canUpdate,
    delete: permission.canDelete,
    read_all: permission.canReadAll,
    update_all: permission.canUpdateAll,
    delete_all: permission.canDeleteAll,
    role: permission.role,
  };
};

function copyToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(text);
  }
}

const RenderMoreIcon = (e: GridRenderCellParams) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const { loginUserPermissions } = useAppSelector((state) => state.user);

  const userModulePermissions = loginUserPermissions.find(
    (module) => module.module.name.toLowerCase() === "users"
  );

  const menus = [
    [
      {
        name: "Edit",
        icon: <EditOutlinedIcon sx={{ fontSize: "20px" }} />,
        action: (id: number) => {
          navigate(`/app/settings/users/${id}/edit`);
        },  
        color: "primary.main",
        isHidden: e.row.isSuperAdmin || !userModulePermissions?.canUpdate,
      },
      {
        name: "Delete",
        icon: <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />,
        action: () => {
          setDelteOpen(true);
          handleClose();
        },
        color: "error.main",
        isHidden: e.row.isSuperAdmin || !userModulePermissions?.canDelete,
      },
    ],
    [
      {
        name: "Copy Email ID",
        icon: <ContentCopyOutlinedIcon sx={{ fontSize: "20px" }} />,
        action: () => {
          copyToClipboard(e.row.email);
          handleClose();
          customToast("success", "Email copied to clipboard");
        },
        color: "text.secondary",
        isHidden: false,
      },
    ],
  ];
  const [deleteOpen, setDelteOpen] = useState(false);
  const onDelete = () => setDelteOpen(true);

  return (
    <>
      <DialogBox
        dialogDetails={{
          title: "Delete User",
          description: (
            <Typography>Are you sure you want to delete this user?</Typography>
          ),
          failureBtnText: "Cancel",
          successBtnText: "Delete",
          id: e.id.toString(),
        }}
        open={deleteOpen}
        setOpen={setDelteOpen}
        successCallBack={onDelete}
      />
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              width: "12%",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {menus.map((sections, index) => (
          <Box key={index}>
            {sections.map((menu) => (
              <Box
                key={menu.name}
                sx={{ display: menu.isHidden ? "none" : "block" }}
              >
                <MenuItem
                  key={menu.name}
                  onClick={() => menu.action && menu.action(e.id as number)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: menu.color,
                    }}
                  >
                    {menu.icon}
                    <Typography sx={{ marginLeft: "8px" }}>
                      {menu.name}
                    </Typography>
                  </Box>
                </MenuItem>
              </Box>
            ))}
            {index < menus.length - 1 && <Divider sx={{ my: 0.5 }} />}
          </Box>
        ))}
      </Menu>
    </>
  );
};

export {
  userColDef,
  roleColumn,
  roleListViewRow,
  rolePermissionColumns,
  rolePermissionRow,
};
