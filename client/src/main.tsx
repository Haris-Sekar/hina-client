import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./fonts/fonts.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Toaster />
				<CssBaseline />
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
