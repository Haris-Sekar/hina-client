/* eslint-disable react-hooks/rules-of-hooks */
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
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteUser, reInviteUser } from "../../api/services/user";
import { fetchUsers } from "../../store/Reducers/UserReducers";

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
		maxWidth: 60,
	},
	{
		field: "name",
		headerName: "Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Name"),
		renderCell: (e) => {
			return (
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Chip
						variant="outlined"
						avatar={
							<Avatar sx={{ bgcolor: getRandomColor(Number(e.id)) }}>
								{e.value.charAt(0).toUpperCase()}
							</Avatar>
						}
						label={e.value}
					/>
					{e.row.isSuperAdmin ? (
						<Tooltip title="Super Admin" arrow placement="bottom">
							<span className="material-symbols-outlined">shield_person</span>
						</Tooltip>
					) : (
						""
					)}
				</Box>
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
			let color = "#e0e0e0";
			let textColor = "#000";
			switch (e.value) {
				case "ACTIVE":
					color = "#4caf50"; // Green for active & verified
					textColor = "#fff";
					break;
				case "SUSPENDED":
					color = "#f44336"; // Red for suspended
					textColor = "#fff";
					break;
				case "INACTIVE":
					color = "#9e9e9e"; // Grey for inactive
					textColor = "#fff";
					break;
				case "READ_ONLY":
					color = "#2196f3"; // Blue for read only
					textColor = "#fff";
					break;
				default:
					color = "#e0e0e0"; // Default light grey
					textColor = "#000";
			}
			return (
				<div
					className="no-padding"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: color,
						userSelect: "none",
					}}
				>
					<span
						style={{ color: textColor, fontWeight: "bold", fontSize: "15px" }}
					>
						{e.value}
					</span>
				</div>
			);
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
						<Tooltip title="Re-Invite User" arrow>
							<IconButton
								onClick={(event) => {
									reInviteUser(e.row.id).then(() => {
										event.currentTarget.disabled = true;
										event.currentTarget.style.cursor = "not-allowed";
									});
								}}
							>
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

	const { loginUserPermissions, currentUserDetails } = useAppSelector(
		(state) => state.user
	);

	console.log(e.row.id);

	const userModulePermissions = loginUserPermissions.find(
		(module) => module.module.name.toLowerCase() === "users"
	);

	//e.row.id == currentUserDetails.userId ? e.row.isSuperAdmin || !userModulePermissions?.canUpdate,
	// if currenct user is super admin he can edit all the users
	if (!currentUserDetails) {
		return <></>;
	}
	const canUpdate = e.row.isSuperAdmin
		? currentUserDetails.userId == e.row.id
		: userModulePermissions?.canUpdate;

	const menus = [
		[
			{
				name: "Edit",
				icon: <EditOutlinedIcon sx={{ fontSize: "20px" }} />,
				action: (id: number) => {
					navigate(`/app/settings/users/${id}/edit`);
				},
				color: "primary.main",
				isHidden: !canUpdate,
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
	const dispatch = useAppDispatch();

	const onDelete = (_e: unknown, id: string) => {
		deleteUser(parseInt(id)).then(() => {
			dispatch(fetchUsers({ page: 0, range: 25 }));
		});
		setDelteOpen(false);
	};

	return (
		<>
			<DialogBox
				dialogDetails={{
					title: "Delete User",
					description: (
						<Typography>
							Are you sure you want to delete this user? This action cannot be
							undone. The user will permanently lose access
						</Typography>
					),
					failureBtnText: "Cancel",
					successBtnText: "Delete",
					id: e.id.toString(),
					checkboxContent:
						"I understand the consequences and want to delete this user.",
					needCheckbox: true,
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
