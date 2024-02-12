import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import PageLayout from "./Layout/PageLayout";
import Dashboard from "./Dashboard/Dashboard";
import Customer from "./Customer/Customer";
import { useAppDispatch, useAppSelector } from "../store/store";
import * as consts from "../Constants/CommonConstants";
import { useEffect } from "react";
import {
	populateCompanyDetails,
	populateCurrentUserDetails,
} from "../store/Reducers/UserReducers";
import AddCustomer from "./Customer/AddCustomer";
import MainArea from "./MainArea/MainArea";
import AddMainArea from "./MainArea/AddMainArea";
import EditCustomer from "./Customer/EditCustomer";
import EditMainArea from "./MainArea/EditMainArea";

const AppRoutes = () => {
	const { companyDetails, currentUserDetails } = useAppSelector(
		(state) => state.user
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const jwtToken = localStorage.getItem(consts.token);
		const userDetails = JSON.parse(
			localStorage.getItem(consts.userDetailsConst) as string
		);
		const cookieComanyDetails = JSON.parse(
			localStorage.getItem(consts.companyDetailsConst) as string
		);
		if (!jwtToken) {
			navigate("/auth");
		}

		if (!currentUserDetails) {
			if (userDetails) {
				dispatch(populateCurrentUserDetails(userDetails));
			}
		}
		if (!companyDetails) {
			if (cookieComanyDetails) {
				dispatch(populateCompanyDetails(cookieComanyDetails));
			}
		}
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				{companyDetails && currentUserDetails && (
					<Route path="/app" element={<PageLayout />}>
						<Route path="/app/dashboard" element={<Dashboard />} />
						<Route path="/app/sales/customer" element={<Customer />} />
						<Route path="/app/sales/customer/add" element={<AddCustomer />} />
						<Route
							path="/app/sales/customer/:id/edit"
							element={<EditCustomer />}
						/>
						<Route path="/app/sales/mainArea" element={<MainArea />} />
						<Route path="/app/sales/mainArea/add" element={<AddMainArea />} />
						<Route
							path="/app/sales/mainArea/:id/edit"
							element={<EditMainArea />}
						/>
						<Route path="/app/*" />
					</Route>
				)}
			</Routes>
		</>
	);
};

export default AppRoutes;
