import { useAppSelector } from "../store/store";

import lightLogo from "../assets/512-black.png";
import darkLogo from "../assets/512-white.png";
// import logo from "../assets/react.svg";

const Logo = () => {
	const { isDarkTheme } = useAppSelector((state) => state.pageSettings);

	return (
		<img
			src={isDarkTheme ? darkLogo : lightLogo}
			alt="logo"
			width="100%"
			height="100%"
		/>
	);
};

export default Logo;
