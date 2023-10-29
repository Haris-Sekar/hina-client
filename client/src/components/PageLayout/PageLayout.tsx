import { Outlet } from "react-router-dom";
import SideNav from "../SideNav/SideNav";
import TopNav from "../TopNav/TopNav";
import sideNavItems from "../SideNav/SideNavItems";

const PageLayout = () => {
  return (
    <div>
      <TopNav/>
      <SideNav navItems={sideNavItems}/>
      {/* <h1>PageLayout</h1> */}
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
