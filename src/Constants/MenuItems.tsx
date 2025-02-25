import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import SchemaOutlinedIcon from "@mui/icons-material/SchemaOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Navigation } from "@toolpad/core/AppProvider";

const sidebarItems: Navigation = [
	{
		segment: "dashboard",
		title: "Dashboard",
		kind: "page",
		icon: <DashboardIcon />,
	},

	{
		kind: "header",
		title: "Sales",
	},
	{
		icon: <PersonOutlinedIcon />,
		title: "Customers",
		segment: "sales/customer",
	},
	{
		icon: <ReceiptLongOutlinedIcon />,
		title: "Invoices",
		segment: "sales/invoice",
	},
	{
		icon: <ListAltOutlinedIcon />,
		title: "Sales Order",
		segment: "sales/order",
	},
	{
		icon: <CurrencyRupeeTwoToneIcon />,
		title: "Payments",
		segment: "sales/payment",
	},
	{
		kind: "header",
		title: "Invnetory",
	},
	{
		segment: "inventory/stock",
		title: "Inventory",
		icon: <Inventory2OutlinedIcon />,
	},
	{
		segment: "inventory/items",
		title: "Items",
		icon: <ShoppingBasketOutlinedIcon />,
	},
	{
		icon: <WorkspacesOutlinedIcon />,
		title: "Item Group",
		segment: "inventory/itemgroup",
	},
	{
		icon: <StraightenOutlinedIcon />,
		title: "Size",
		segment: "inventory/size",
	},
	{
		icon: <SchemaOutlinedIcon />,
		title: "Rate Version",
		segment: "inventory/rateversion",
	},
	{
		kind: "header",
		title: "Purchase",
	},
	{
		icon: <SupervisorAccountTwoToneIcon />,
		title: "Vendors",
		segment: "purchase/vendor",
	},
	{
		icon: <ReceiptLongOutlinedIcon />,
		title: "Bills",
		segment: "purchase/bill",
	},
	{
		icon: <ListAltOutlinedIcon />,
		title: "Purchase Order",
		segment: "purchase/order",
	},
	{
		icon: <CurrencyRupeeTwoToneIcon />,
		title: "Payments",
		segment: "purchase/payment",
	},
];

export { sidebarItems };
