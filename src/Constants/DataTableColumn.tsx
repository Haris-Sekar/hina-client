/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { GridColDef } from "@mui/x-data-grid";
import { customerRowData, mainAreaRowData } from "../Types/Customer";
import {
	ItemGroupRowData,
	ItemRowData,
	RateVersionRowData,
	SizeRowData,
} from "../Types/Inventory";
import { Avatar, Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { User, userRowData } from "../Types/User";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';


function getHeader(name: string) {
	return <strong style={{ fontSize: "16px" }}>{name}</strong>;
}

const getRandomColor = (userId: number) => {
	const color = Math.floor(Math.random() * 16777215).toString(16);

	const userBasedColor = localStorage.getItem("user-colors");

	if (userBasedColor) {
		const parsedUserBasedColor = JSON.parse(userBasedColor);
		if (parsedUserBasedColor?.[userId.toString()]) {
			return parsedUserBasedColor?.[userId.toString()];
		} else {
			parsedUserBasedColor[userId.toString()] = `#${color}`;
			localStorage.setItem(
				"user-colors",
				JSON.stringify(parsedUserBasedColor)
			);
			return `#${color}`;
		}
	} else {
		localStorage.setItem(
			"user-colors",
			JSON.stringify({
				[userId.toString()]: `#${color}`,
			})
		);
		return `#${color}`;
	}
};

const customer: GridColDef[] = [
	{
		field: "customerName",
		headerName: "Customer Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Name"),
		hideable: false,
	},
	{
		field: "email",
		headerName: "Email",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Email"),
	},
	{
		field: "phone",
		headerName: "Phone",
		minWidth: 200,
		flex: 1,
		sortable: false,
		renderHeader: () => getHeader("Phone"),
	},
	{
		field: "currentBalance",
		headerName: "Receivables",
		minWidth: 200,
		flex: 1,
		sortable: false,
		renderHeader: () => getHeader("Receivables"),
		hideable: true,
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
		sortable: false,
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
		hideable: true,
		sortable: false,
		renderCell: (e) => {
			return renderUser(e);
		},
	},
];

const renderUser = (e: any) => {
	if (e.value === null) {
		e.value = {
			first_name: e.row.name.split(" ")[0],
			last_name: e.row.name.split(" ")[1],
			id: e.id,
		};
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				height: "100%",
				userSelect: "none",
			}}
		>
			<Avatar
				sx={{
					width: 24,
					height: 24,
					fontSize: "14px",
					bgcolor: getRandomColor(e.value.id),
				}}
			>
				{e.value.first_name.charAt(0).toUpperCase()}
			</Avatar>
			<Typography
				sx={{ marginLeft: "8px", color: "inherit", fontSize: "14px" }}
			>
				{e.value.first_name} {e.value.last_name}
			</Typography>
		</Box>
	);
};

const renderDateAndTime = (e: any) => {
	return moment(e.value).format("DD MMM YYYY, hh:mm A");
};

const renderMoreIcon = () => {
	return (
		<IconButton>
			<MoreHorizIcon />
		</IconButton>
	);
};

const userColDef: GridColDef[] = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		renderHeader: () => getHeader(""),
		renderCell: () => {
			return renderMoreIcon();
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
					? e.row.isVerified ? "success" : "warning"
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

const mainArea: GridColDef[] = [
	{
		field: "name",
		headerName: "Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Name"),
	},
];

const paymentTermsColDef: GridColDef[] = [
	{
		field: "name",
		headerName: "Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Name"),
	},
	{
		field: "numberOfDays",
		headerName: "Number of Days",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Number of Days"),
	},
];

const createCustomerRow = (
	id: number,
	customerName: string,
	phone?: string,
	email?: string,
	currentBalance?: string,
	createdTime?: string,
	createdBy?: object,
	updatedTime?: string,
	updatedBy?: object
): customerRowData => {
	return {
		id,
		customerName,
		phone,
		email,
		currentBalance,
		createdTime,
		createdBy,
		updatedTime,
		updatedBy,
	};
};

const createUserRow = (user: User): userRowData => {
	return {
		id: user.userId,
		name: `${user.firstName} ${user.lastName}`,
		email: user.email,
		role: user.role || { name: "Portal Owner" },
		status: user.status,
		isVerified: user.isVerified || false,
		createdTime: user.createdTime,
		createdBy: user.createdBy,
		updatedTime: user.updatedTime,
		updatedBy: user.updatedBy,
	};
};

const createMainAreaRow = (id: number, name: string): mainAreaRowData => {
	return { id, name };
};

const itemGroup: GridColDef[] = [
	{
		field: "name",
		headerName: "Group Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Group Name"),
	},
];

const createItemGroupRow = (id: number, name: string): ItemGroupRowData => {
	return { id, name };
};

const size: GridColDef[] = [
	{
		field: "size",
		headerName: "Size",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Size"),
	},
];

const rateVersion: GridColDef[] = [
	{
		field: "name",
		headerName: "Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Name"),
	},
	{
		field: "isDefault",
		headerName: "Is Default",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Is Default"),
	},
];

const createSizeRow = (id: number, size: string): SizeRowData => {
	return { id, size };
};
const createRateVersionRow = (
	id: number,
	name: string,
	isDefault: boolean
): RateVersionRowData => {
	return {
		id,
		name,
		isDefault,
	};
};

const Items: GridColDef[] = [
	{
		field: "itemName",
		headerName: "Item Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Item Name"),
	},
	{
		field: "hsnCode",
		headerName: "HSN Code",
		flex: 1,
		renderHeader: () => getHeader("HSN Code"),
		renderCell: (e) => (e.value > 0 ? e.value : "-"),
	},
	{
		field: "itemGroup",
		headerName: "Item Group",
		renderHeader: () => getHeader("Item Group"),
		flex: 1,
	},
	{
		field: "unit",
		headerName: "Unit",
		renderHeader: () => getHeader("Unit"),
		flex: 1,
	},
	{
		field: "pcsPerUnit",
		headerName: "Pcs Per Unit",
		renderHeader: () => getHeader("Pcs Per Unit"),
	},
];

const createItemRow = (
	id: number,
	itemName: string,
	hsnCode: number,
	itemGroup: string,
	unit: string,
	pcsPerUnit: number
): ItemRowData => {
	return { id, itemName, hsnCode, itemGroup, unit, pcsPerUnit };
};
export {
	Items,
	createItemRow,
	customer,
	createCustomerRow,
	mainArea,
	createMainAreaRow,
	itemGroup,
	createItemGroupRow,
	size,
	createSizeRow,
	rateVersion,
	createRateVersionRow,
	paymentTermsColDef,
	userColDef,
	createUserRow,
};

export {
	renderDateAndTime,
	renderUser,
	getHeader,
	renderMoreIcon,
	getRandomColor
}
