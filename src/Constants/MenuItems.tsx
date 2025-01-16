import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
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
		segment: "inventory",
		pattern: "inventory{/:segment}*",
		title: "Inventory",
		icon: <Inventory2OutlinedIcon />,
		children: [
			{
				segment: "items",
				title: "Items",
				icon: <ShoppingBasketOutlinedIcon />,
			},
			{
				icon: <WorkspacesOutlinedIcon />,
				title: "Item Group",
				segment: "itemgroup",
			},
			{
				icon: <StraightenOutlinedIcon />,
				title: "Size",
				segment: "size",
			},
			{
				icon: <SchemaOutlinedIcon />,
				title: "Rate Version",
				segment: "rateversion",
			},
		],
	},
	{
		segment: "sales",
		title: "Sales",
		icon: <ShoppingCartOutlinedIcon />,
		pattern: "sales{/:segments}*",
		children: [
			{
				icon: <PersonOutlinedIcon />,
				title: "Customers",

				segment: "customer",
			},
			{
				icon: <ReceiptLongOutlinedIcon />,
				title: "Invoices",
				segment: "invoice",
			},
			{
				icon: <ListAltOutlinedIcon />,
				title: "Sales Order",
				segment: "order",
			},
			{
				icon: <CurrencyRupeeTwoToneIcon />,
				title: "Payments",
				segment: "payment",
			},
		],
	},
	{
		kind: "divider",
	},
	{
		segment: "purchase",
		title: "Purchanse",
		icon: <ShoppingBagOutlinedIcon />,
		children: [
			{
				icon: <SupervisorAccountTwoToneIcon />,
				title: "Vendors",
				segment: "vendor",
			},
			{
				icon: <ReceiptLongOutlinedIcon />,
				title: "Bills",
				segment: "bill",
			},
			{
				icon: <ListAltOutlinedIcon />,
				title: "Purchase Order",
				segment: "order",
			},
			{
				icon: <CurrencyRupeeTwoToneIcon />,
				title: "Payments",
				segment: "payment",
			},
		],
	},
];

export { sidebarItems };
