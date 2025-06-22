import {
	Box,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { GridRenderCellParams } from "@mui/x-data-grid";

interface ContextMenuProps {
	menuItems: MenuItem[][];
	onMenuItemClick?: (item: MenuItem) => void;
}

interface MenuItem {
	name: string;
	icon: JSX.Element;
	color: string;
	isHidden: boolean;
	row?: GridRenderCellParams;
	isDisabled?: boolean;
	tooltip?: string;
}

const ContextMenu = (props: ContextMenuProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
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
				{props.menuItems.map((sections, index) => (
					<Box key={index}>
						{sections.map((menu) => (
							<Tooltip title={menu.tooltip || ""} key={menu.name} arrow placement="right">
								<Box
									key={menu.name}
									sx={{ display: menu.isHidden ? "none" : "block" }}
								>
									<MenuItem
										key={menu.name}
										onClick={() =>
											props.onMenuItemClick && props.onMenuItemClick(menu)
										}
										disabled={menu.isDisabled}
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
							</Tooltip>
						))}
						{index < props.menuItems.length - 1 && <Divider sx={{ my: 0.5 }} />}
					</Box>
				))}
			</Menu>
		</Box>
	);
};
export default ContextMenu;

export type { ContextMenuProps, MenuItem };
