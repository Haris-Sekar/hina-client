import lightLogo from "../assets/512-black.png";
import darkLogo from "../assets/512-white.png";
import { useColorScheme } from "@mui/material";

const Logo = () => {
	const { mode, setMode } = useColorScheme();

	return (
		<img
			src={mode === "dark" ? darkLogo : lightLogo}
			alt="logo"
			width="100%"
			height="100%"
		/>
	);
};

export default Logo;
