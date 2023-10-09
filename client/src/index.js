import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/fonts.css";
import Router from "./Router";
import { StyledEngineProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider>
    <Router />
  </StyledEngineProvider>
);
