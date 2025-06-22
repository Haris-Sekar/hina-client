/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { customerRowData, mainAreaRowData } from "../Types/Customer";
import { Avatar, Box, Typography } from "@mui/material";
import { User, userRowData } from "../Types/User";
import moment from "moment";
import ContextMenu, { MenuItem } from "../components/ContextMenu";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
			localStorage.setItem("user-colors", JSON.stringify(parsedUserBasedColor));
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

const RenderCustomerMoreIcon = (e: GridRenderCellParams) => {
	const menuItems: MenuItem[][] = [
		[
			{
				name: "Edit",
				icon: <EditOutlinedIcon sx={{ fontSize: "20px" }} />,
				color: "primary.main",
				isHidden: false,
				...e,
			},
			{
				name: "Delete",
				icon: <DeleteOutlineOutlinedIcon sx={{ fontSize: "20px" }} />,
				color: "red",
				isHidden: false,
				...e,
			},
		],
	];

	return (
		<ContextMenu
			menuItems={menuItems}
			onMenuItemClick={(item) => {
				console.log(item);
			}}
		/>
	);
};

const customer: GridColDef[] = [
	
	{
		field: "id",
		headerName: "",
		renderHeader: () => getHeader(""),
		renderCell: (e) => {
			return RenderCustomerMoreIcon(e);
		},
		hideable: false,
		hideSortIcons: true,
		sortable: false,
		disableColumnMenu: true,
		resizable: false,
		maxWidth: 10,
	},
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
		isSuperAdmin: user.isSuperAdmin || false,
	};
};

const createMainAreaRow = (id: number, name: string): mainAreaRowData => {
	return { id, name };
};

export {
	customer,
	createCustomerRow,
	mainArea,
	createMainAreaRow,
	paymentTermsColDef,
	createUserRow,
};

export { renderDateAndTime, renderUser, getHeader, getRandomColor };
