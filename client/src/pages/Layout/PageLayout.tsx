import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./layout.css";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "../../store/store";
const PageLayout = () => {
	const customerLoading = useAppSelector((state) => state.customer.loading);
	const userLoading = useAppSelector((state) => state.user.loading);
	const inventoryLoading = useAppSelector((state) => state.inventory.loading);


	return (
		<div className="pageLayoutContainer">
			<Sidebar />
			<div className="rhsContainer">
				{/* <Navbar /> */}
				<div className="main">
					{(customerLoading || userLoading || inventoryLoading) && (
						<LinearProgress />
					)}
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PageLayout;
