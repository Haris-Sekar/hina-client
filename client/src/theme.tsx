import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		background: {
			default: "#eef2f6",
			paper: "#ffffff",
		},
		primary: {
			main: "#5e35b1",
		},
		info: {
			main: "#ffffff",
		},
	},
	typography: {
		fontFamily: "Zoho Puvi",
		h1: {
			fontSize: "35px",
			fontWeight: "bold",
			textAlign: "center",
			margin: 20,
		},
	},
	components: {
		MuiTextField: {
			defaultProps: {
				inputProps: {
					style: {},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontFamily: "Zoho Puvi",
					textTransform: "unset",
					fontWeight: "bold",
					fontSize: "17px",
					borderRadius: 10,
				},
			},
		},
	},
});

export default theme;
