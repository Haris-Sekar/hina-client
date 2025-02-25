import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	colorSchemes: {
		dark: {
			palette: {
				primary: {
					main: "#fefefe",
				},
				background: {
					default: "#111111",
					paper: "#222222"
				},
			},
		},
		light: {
			palette: {
				background: {
					default: "#F8F7F9",
				},
				primary: {
					main: "#408dfb",
				},
			},
		},
	},
	cssVariables: {
		colorSchemeSelector: "data-toolpad-color-scheme",
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
			styleOverrides: {
				// Dynamic styles using theme callback
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: "10px",
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: () => ({
					fontFamily: "Zoho Puvi",
					textTransform: "unset",
					borderRadius: 10,
				}),
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					// Individual tab styles
					minHeight: 48,
					textTransform: "unset",
					fontSize: "1rem",
					"&.Mui-selected": {
						fontWeight: 600,
					},
					// Add space between tabs
					"&:not(:first-of-type)": {
						marginLeft: 24,
					},
					borderRadius: "10px 10px 0 0",
				},
			},
		},
	},
});

export default theme;
