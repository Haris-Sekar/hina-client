import { useColorScheme } from "@mui/material";
import lightLogo from "../assets/512-black.png";
import darkLogo from "../assets/512-white.png";
import { useEffect, useState } from "react";

const Logo = () => {
	const { mode } = useColorScheme();
	const [logo, setLogo] = useState(mode === "dark" ? darkLogo : lightLogo);

	useEffect(() => {
		if (mode === "system") {
			const isMatch = window.matchMedia("(prefers-color-scheme: dark)").matches;
			setLogo(isMatch ? darkLogo : lightLogo);
		} else {
			setLogo(mode === "dark" ? darkLogo : lightLogo);
		}
	}, [mode]);

	return <img src={logo} alt="logo" width="100%" height="100%" />;
};

export default Logo;
