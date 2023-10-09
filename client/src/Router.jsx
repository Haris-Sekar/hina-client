import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Customer from "./Pages/Customer";
import Navbar from "./components/Navbar";
const Router = () => {
  return (
    <BrowserRouter>
      <div className="browerPage">
        <div className="sidebarContainer">
          <Sidebar />
        </div>
        <div className="pageContent">
          <div className="rightContainer">
            <Navbar />
            <Routes>
              <Route path="/app" element={<>dash</>} />
              <Route path="/customer/*" element={<Customer />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
