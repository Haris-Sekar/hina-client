import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "./theme"; // 👈 dynamic theme provider
import "./fonts/fonts.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Provider store={store}>
      <CustomThemeProvider>
        <Toaster />
        <CssBaseline />
        <Analytics />
        <App />
      </CustomThemeProvider>
    </Provider>
  </React.Fragment>
);
