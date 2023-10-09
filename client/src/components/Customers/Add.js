import React from "react";
import InputField from "../InputField";

import "../css/Add.css";
import CButton from "../CButton";
import { green, red } from "../Colors";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate, useSearchParams} from "react-router-dom";
import ListSelect from "../CSelect";
const Add = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");

  const ListSelectItems = [
    { name: "ammapet", value: "asdf" },
    { name: "asdf", value: "1" },
  ];
  const handleListChange = (event) => {
    console.log(event);
  };
  const navigate = useNavigate();
  return (
    <div className="addContainer">
      <div className="formContainer">
        <div className="fromGroupTitle">Customer Details</div>
        <div className="formGroup">
          <InputField
            labelName="First Name"
            value=""
            placeholder="Customer First Name"
            required
          />
          <InputField
            labelName="Last Name"
            value=""
            placeholder="Customer Last Name"
          />
        </div>

        <div className="formGroup">
          <InputField
            labelName="Phone Number"
            value=""
            placeholder="Phone Number"
            type="number"
            required
          />
          <InputField
            labelName="Email"
            value=""
            placeholder="Email Address"
            type="email"
            isHelp={true}
            helpText="If Email is provided will email them the updates that your are configured"
          />
        </div>
        <div className="formGroup">
          <InputField
            labelName="GST Number"
            value=""
            placeholder="GST Number"
            type="text"
          />
        </div>
        <div className="fromGroupTitle">Address</div>
        <div className="formGroup">
          <InputField
            labelName="Address Line 1"
            value=""
            placeholder="Address Line 1"
            type="text"
          />
          <InputField
            labelName="Address Line 2"
            value=""
            placeholder="Address Line 2"
            type="text"
          />
        </div>
        <div className="formGroup">
          <ListSelect
            items={ListSelectItems}
            defaultValue="customer"
            clickCallBack={handleListChange}
            label="Main Area"
          />
        </div>
      </div>
      <div className="btnContainer">
        <CButton color={green} icon={<AddBoxIcon />} title="Add Customer" />
        <CButton
          color={red}
          icon={<CloseIcon />}
          title="Cancel"
          click={() => navigate("/customer")}
        />
      </div>
    </div>
  );
};

export default Add;
