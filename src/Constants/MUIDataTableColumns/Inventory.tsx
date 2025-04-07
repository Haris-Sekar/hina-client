import { GridColDef } from "@mui/x-data-grid";
import { getHeader, renderDateAndTime, renderUser } from "../DataTableColumn";
import { ItemGroup, ItemGroupRowData } from "../../Types/Inventory";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteItemGroup } from "../../api/services/inventory";
import { fetchItemGroup } from "../../store/Thunks/InventoryThunks";

const createItemGroupRow = (group: ItemGroup): ItemGroupRowData => {
  return {
    id: group.groupId,
    name: group.name,
    description: group.description,
    createdBy: group.createdBy,
    createdTime: group.createdTime,
    updatedBy: group.updatedBy,
    updatedTime: group.updatedTime,
  };
};

const itemGroup: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e);
    },
    hideable: false,
    hideSortIcons: true,
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    maxWidth: 10,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Name"),
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Description"),
  },
  {
    field: "createdBy",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created By"),
    renderCell: (e) => renderUser(e),
  },
  {
    field: "createdTime",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created Time"),
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
  {
    field: "updatedTime",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
];

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

  const dispatch = useAppDispatch();

  const { loginUserPermissions } = useAppSelector((state) => state.user);

  const inventoryModulePermissions = loginUserPermissions.find(
    (module) => module.module.name.toLowerCase() === "item group"
  );

  const menus = [
    [
      {
        name: "Edit",
        icon: <EditOutlinedIcon sx={{ fontSize: "20px" }} />,
        action: (id: number) => {
          navigate(`/app/inventory/itemgroup/${id}/edit?from=detail`);
        },
        color: "primary.main",
        isHidden: !inventoryModulePermissions?.canUpdate,
      },
      {
        name: "Delete",
        icon: <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />,
        action: () => {
          setDeleteOpen(true);
          handleClose();
        },
        color: "error.main",
        isHidden: !inventoryModulePermissions?.canDelete,
      },
    ],
  ];

  const [deleteOpen, setDeleteOpen] = useState(false);
  const onDelete = () => {
    deleteItemGroup(e.id as number).then(() => dispatch(fetchItemGroup({}))); 
    setDeleteOpen(false);
  };

  return (
    <>
      <DialogBox
        dialogDetails={{
          title: "Delete Item Group",
          description: (
            <Typography>
              Are you sure you want to delete this item group? This action
              cannot be undone.
            </Typography>
          ),
          failureBtnText: "Cancel",
          successBtnText: "Delete",
          id: e.id.toString(),
          checkboxContent:
            "I understand that deleting this item group will affect all related items.",
          needCheckbox: true,
        }}
        open={deleteOpen}
        setOpen={setDeleteOpen}
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

export { createItemGroupRow, itemGroup };
