import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./layout.css";
import Navbar from "./Navbar";
const PageLayout = () => {
	return (
		<div className="pageLayoutContainer">
			<Sidebar />
			<div className="rhsContainer">
				{/* <Navbar /> */}
				<div className="main">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PageLayout;
