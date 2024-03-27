import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useWindowSize from "../../components/UseWindowSize";

import { Avatar, Card, Tooltip, Typography, Zoom } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { sidebarItems } from "../../Constants/MenuItems";
import { Link } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function Sidebar() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	const windowSize = useWindowSize();

	React.useEffect(() => {
		const shouldCollapse =
			windowSize.width !== undefined && windowSize.width < 700;
		setOpen(!shouldCollapse);
	}, [windowSize.width]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	let key = 0;

	const companyDetails = useAppSelector((state) => state.user.companyDetails);
	return (
		<Box sx={{ display: "flex" }}>
			<Drawer variant="permanent" open={open}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{open ? (
						<Typography variant="h1" sx={{ ml: 5 }}>
							{companyDetails?.name}
						</Typography>
					) : (
						<></>
					)}
					<Toolbar>
						{open ? (
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === "rtl" ? (
									<ChevronRightIcon />
								) : (
									<ChevronLeftIcon />
								)}
							</IconButton>
						) : (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								sx={{
									marginRight: 5,
								}}
							>
								<MenuIcon />
							</IconButton>
						)}
					</Toolbar>
				</Box>
				{sidebarItems.map((menu) => (
					<>
						{menu.header && (
							<>
								<Divider sx={{ mt: 2, mb: 2 }} key={menu.header.text}>
									{open ? (
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: 1,
											}}
										>
											{menu.header.icon}
											<Typography variant="h6">{menu.header.text}</Typography>
										</Box>
									) : (
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: 1,
											}}
										>
											<Tooltip
												TransitionComponent={Zoom}
												placement="right"
												title={menu.header.text}
												arrow
											>
												{menu.header.icon}
											</Tooltip>
										</Box>
									)}
								</Divider>
							</>
						)}
						{menu.items.map((item) => (
							<Box key={key++}>
								<Link
									key={key++}
									to={
										menu.header?.commonTo
											? menu.header?.commonTo + item.to
											: item.to
									}
								>
									<ListItem
										key={item.text}
										disablePadding
										sx={{ display: "block" }}
									>
										<ListItemButton
											sx={{
												minHeight: 48,
												justifyContent: open ? "initial" : "center",
												px: 2.5,
											}}
											selected={window.location.pathname.includes(
												menu.header?.commonTo
													? menu.header?.commonTo + item.to
													: item.to
											)}
										>
											{open ? (
												<ListItemIcon
													sx={{
														minWidth: 0,
														mr: open ? 3 : "auto",
														justifyContent: "center",
													}}
												>
													{item.icon}
												</ListItemIcon>
											) : (
												<Tooltip
													TransitionComponent={Zoom}
													placement="right"
													title={item.text}
													arrow
												>
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : "auto",
															justifyContent: "center",
														}}
													>
														{item.icon}
													</ListItemIcon>
												</Tooltip>
											)}

											<ListItemText
												primary={item.text}
												sx={{ opacity: open ? 1 : 0 }}
											/>
										</ListItemButton>
									</ListItem>
								</Link>
								{item.subItems &&
									item?.subItems.map((item) => (
										<Link
											to={
												menu.header?.commonTo
													? menu.header?.commonTo + item.to
													: item.to
											}
											style={{ marginLeft: "10%" }}
										>
											<ListItem
												key={item.text}
												disablePadding
												sx={{ display: "block" }}
											>
												<ListItemButton
													sx={{
														minHeight: 48,
														justifyContent: open ? "initial" : "center",
														px: 2.5,
													}}
													selected={window.location.pathname.includes(
														menu.header?.commonTo
															? menu.header?.commonTo + item.to
															: item.to
													)}
												>
													{open ? (
														<ListItemIcon
															sx={{
																minWidth: 0,
																mr: open ? 3 : "auto",
																justifyContent: "center",
															}}
														>
															{item.icon}
														</ListItemIcon>
													) : (
														<Tooltip
															TransitionComponent={Zoom}
															placement="right"
															title={item.text}
															arrow
														>
															<ListItemIcon
																sx={{
																	minWidth: 0,
																	mr: open ? 3 : "auto",
																	justifyContent: "center",
																}}
															>
																{item.icon}
															</ListItemIcon>
														</Tooltip>
													)}

													<ListItemText
														primary={item.text}
														sx={{ opacity: open ? 1 : 0 }}
													/>
												</ListItemButton>
											</ListItem>
										</Link>
									))}
							</Box>
						))}
					</>
				))}
				<Box>
					<Card sx={{ width: "100%", display: "flex", alignItems: "center" }}>
						<Avatar></Avatar>
						<Typography>
							NameasdfasdfasdfasdfasdNameasdfasdfasdfasdfasdNameasdfasdfasdfasdfasdNameasdfasdfasdfasdfasdNameasdfasdfasdfasdfasd
						</Typography>
					</Card>
				</Box>
			</Drawer>
		</Box>
	);
}
