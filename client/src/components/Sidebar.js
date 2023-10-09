import React, {useEffect, useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import "./css/Sidebar.css";
import hinaLogo from "../images/512-black.png";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {

  const [isMin, setIsMin] = useState(false);
  const location = window.location;

  const navigate = useNavigate();

  useEffect(() => {
      if(location.pathname === "/") {
          navigate("/app")
      }
  }, [])
  const sidebarItems = [
    {
        name: "dashboard",
        url: "/app",
        icon: SpaceDashboardIcon
    },{
        name: "customers",
        url: "/customer",
        icon: PersonIcon
    },{
        name: "products",
        url: "/product",
        icon: InventoryIcon
    },{
        name: "estimates",
        url: "/estimate",
        icon: RequestQuoteIcon
    },{
        name: "invoice",
        url: "/invoice",
        icon: ReceiptLongIcon
    },{
        name: "payments",
        url: "/payment",
        icon: PaymentsIcon
    },{
        name: "reports",
        url: "/report",
        icon: AnalyticsIcon
    }

  ]

  

  const handleSidebarClick = (name) => {
    navigate(`${name}`)
  } 

  return (
    <div className={isMin ? "container isMin" : "container"}>
      <div className="sidebar">
        <div className="top">
          <div className="compSelector">
            <div className="compImg" id="expandMore1">
              <img src={hinaLogo} alt="HINA" />
            </div>
            <div className={isMin ? "compName hideOnMin" : "compName"}>
              Hina
            </div>
          </div>
          <div className="sidebarItems">
          
          {sidebarItems.map((item) => {
            return (<div key={item.name} className={location.pathname.includes(item.url) ? "item active" : "item" } onClick={() => handleSidebarClick(item.url)}>
              <div className="logo">
                {<item.icon />}
                <span className="tooltiptext">{item.name}</span>
              </div>
              <div className={isMin ? "text hideOnMin" : "text "}>
                {item.name}
              </div>
            </div>)
          })}
          </div>
        </div>
        <div className="bottom">
          <div className="minMaxBtn" onClick={() => setIsMin(!isMin)}>
            <span className="material-symbols-rounded">
              <ArrowBackIosNewIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
