import { GridColDef } from "@mui/x-data-grid";
import { customerRowData, mainAreaRowData } from "../Types/Customer";
import { ItemGroupRowData, SizeRowData } from "../Types/Inventory";

function getHeader(name: string) {
	return <strong style={{ fontSize: 16 }}>{name}</strong>;
}

const customer: GridColDef[] = [
	{
		field: "companyName",
		headerName: "Company Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Company Name"),
	},
	{
		field: "name",
		headerName: "Name",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Name"),
	},
	{
		field: "phoneNumber",
		headerName: "Phone number",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Phone Number"),
	},
	{
		field: "email",
		headerName: "Email",
		minWidth: 200,
		flex: 1,
		renderHeader: () => getHeader("Email"),
	},
	{
		field: "gst",
		headerName: "GST Number",
		width: 200,
		flex: 1,
		renderHeader: () => getHeader("GST Number"),
	},
	{
		field: "mainArea",
		headerName: "Main Area",
		width: 200,
		flex: 1,
		renderHeader: () => getHeader("Main Area"),
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

const createCustomerRow = (
	id: number,
	companyName: string,
	firstName: string,
	lastName: string,
	phoneNumber: number,
	email: string,
	gst: string,
	mainArea: string
): customerRowData => {
	return {
		id,
		companyName,
		name: firstName + " " + (lastName ? lastName : ""),
		phoneNumber,
		email,
		gst,
		mainArea,
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

const createSizeRow = (id: number, size: string): SizeRowData => {
	return { id, size };
};
export {
	customer,
	createCustomerRow,
	mainArea,
	createMainAreaRow,
	itemGroup,
	createItemGroupRow,
	size,
	createSizeRow,
};
