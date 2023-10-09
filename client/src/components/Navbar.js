import React, { useState } from "react";

import "./css/Navbar.css";
import Avatar from "@mui/material/Avatar";
import { Drawer } from "@mui/material";

const Navbar = () => {
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);

  return (
    <div className="navbar">
      <div className="rightSide">asdf</div>
      <div className="leftSide">
        <div className="profile">
          <Avatar
            className="avatar"
            onClick={() => setOpenProfileDrawer(true)}
          />
          <Drawer
            anchor="right"
            open={openProfileDrawer}
            onClose={() => setOpenProfileDrawer(!openProfileDrawer)} 
          >
            <div className="profileDrawer">asdf</div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
