import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	colorSchemes: { light: true, dark: true },
	defaultColorScheme: "dark",
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
