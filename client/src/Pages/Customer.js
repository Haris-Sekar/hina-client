import React, { useState } from "react";
import "./css/Customer.css";
import ListSelect from "../components/CSelect";
import CButton from "../components/CButton";
import { blue, green } from "../components/Colors";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import Add from "../components/Customers/Add";
const Customer = () => {
  const navigate = useNavigate();

  const ListSelectItems = [
    { name: "Customers", value: "customer" },
    { name: "Main Area", value: "mainArea" },
    { name: "Inactive Customer", value: "inactiveCustomer" },
  ];

  function getNameFromValue(value) {
    for (const item of ListSelectItems) {
      if (item.value === value) {
        return item.name;
      }
    }
    return null;
  }

  const addList = ["customer", "mainArea"];

  const location = useLocation();

  const handleListChange = (e) => {
    if (e === "customer") {
      navigate("/customer");
    } else {
      navigate(`/customer/${e}`);
    }
  };

  return (
    <div className="customer">
      {location.pathname.includes("add") ? (
        <div className="contents">
          <Add />
        </div>
      ) : (
        <>
          <div className="header">
            <div className="list">
              <ListSelect
                items={ListSelectItems}
                defaultValue="customer"
                clickCallBack={handleListChange}
              />
            </div>
            {addList.includes(
              location.pathname.split("/")[
                location.pathname.split("/").length - 1
              ]
            ) ? (
              <div className="add">
                <CButton
                  title={"Add " + getNameFromValue(location.pathname.split("/")[location.pathname.split("/").length - 1])}
                  color={green}
                  icon={<AddIcon />}
                  click={() => navigate("/customer/add?type="+location.pathname.split("/")[location.pathname.split("/").length - 1] )}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="content"></div>
        </>
      )}
    </div>
  );
};

export default Customer;
