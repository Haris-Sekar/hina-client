import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
const NavbarRightPanel = () => {
	const navigate = useNavigate();
	const onSettingsClick = () => {
		navigate("/app/settings");
	};

	const { loginUserPermissions } = useAppSelector((state) => state.user);

	const isSettingsVisible = loginUserPermissions && loginUserPermissions.some((permission) => permission.module.name === "Settings" && permission.canRead);

	return (
		<Box
			sx={{
				textAlign: "center",
				mt: "auto",
			}}
		>
			<Stack direction="row">
				<ThemeSwitcher />
				<IconButton onClick={() => onSettingsClick()} sx={{display: !isSettingsVisible ? "none" : "block"}}><Tooltip title="Settings" arrow><SettingsOutlinedIcon /></Tooltip></IconButton>
			</Stack>
		</Box>
	);
};

export default NavbarRightPanel;
