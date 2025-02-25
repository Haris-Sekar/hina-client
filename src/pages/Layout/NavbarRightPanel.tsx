import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";
const NavbarRightPanel = () => {
	const navigate = useNavigate();
	const onSettingsClick = () => {
		navigate("/app/settings");
	};

	return (
		<Box
			sx={{
				textAlign: "center",
				mt: "auto",
			}}
		>
			<Stack direction="row">
				<ThemeSwitcher />
				<IconButton onClick={() => onSettingsClick()}><Tooltip title="Settings" arrow><SettingsOutlinedIcon /></Tooltip></IconButton>
			</Stack>
		</Box>
	);
};

export default NavbarRightPanel;
