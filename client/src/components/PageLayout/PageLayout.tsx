import { Outlet } from "react-router-dom";
const PageLayout = () => {
  return (
    <div>
      <h1>PageLayout</h1>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
