import { Route, Routes } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "./Dashboard/Dashboard";
import Customers from "./Customers/Customers";
import { Products } from "./Products/Products";
import { Estimates } from "./Estimates/Estimates";
import Invoice from "./Invoice/Invoice";
import Auth from "./Auth/Auth";
import Home from "./Home/Home";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/estimates" element={<Estimates />} />
        <Route path="/invoice" element={<Invoice />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Pages;
