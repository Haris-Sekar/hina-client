import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
const sidebarItems = [
	{
		items: [
			{
				icon: <SpeedOutlinedIcon color="primary" />,
				text: "Dashboard",
				to: "/app/dashboard",
				subItems: [],
			},
			{
				icon: <Inventory2OutlinedIcon color="primary" />,
				text: "Inventory",
				to: "/app/inventory",
				subItems: [],
			},
		],
	},
	{
		header: {
			icon: <ShoppingCartOutlinedIcon />,
			text: "Sales",
			commonTo: "/app/sales",
		},
		items: [
			{
				icon: <PersonOutlinedIcon color="primary" />,
				text: "Customers",
				to: "/customer",
				subItems: [
					{
						icon: <DomainAddIcon color="primary" />,
						text: "Main Area",
						to: "/mainArea",
					},
				],
			},

			{
				icon: <ReceiptLongOutlinedIcon color="primary" />,
				text: "Invoices",
				to: "/invoice",
				subItems: [],
			},
			{
				icon: <ListAltOutlinedIcon color="primary" />,
				text: "Sales Order",
				to: "/order",
				subItems: [],
			},
			{
				icon: <CurrencyRupeeTwoToneIcon color="primary" />,
				text: "Payments",
				to: "/payment",
				subItems: [],
			},
		],
	},
	{
		header: {
			icon: <ShoppingBagOutlinedIcon />,
			text: "Purchase",
			commonTo: "/app/purchase",
		},
		items: [
			{
				icon: <SupervisorAccountTwoToneIcon color="primary" />,
				text: "Vendors",
				to: "/vendor",
				subItems: [],
			},
			{
				icon: <ReceiptLongOutlinedIcon color="primary" />,
				text: "Bills",
				to: "/bill",
				subItems: [],
			},
			{
				icon: <ListAltOutlinedIcon color="primary" />,
				text: "Purchase Order",
				to: "/order",
				subItems: [],
			},
			{
				icon: <CurrencyRupeeTwoToneIcon color="primary" />,
				text: "Payments",
				to: "/payment",
				subItems: [],
			},
		],
	},
];

export { sidebarItems };
