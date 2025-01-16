import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import PageLayout from "./Layout/PageLayout";
import Dashboard from "./Dashboard/Dashboard";
import Customer from "./Customer/Customer";
import * as consts from "../Constants/CommonConstants";
import { useEffect } from "react";
import AddCustomer from "./Customer/AddCustomer";
import MainArea from "./Customer/MainArea/MainArea";
import AddMainArea from "./Customer/MainArea/AddMainArea";
import EditCustomer from "./Customer/EditCustomer";
import EditMainArea from "./Customer/MainArea/EditMainArea";
import ItemGroup from "./Inventory/ItemGroup/ItemGroup";
import AddItemGroup from "./Inventory/ItemGroup/AddItemGroup";
import EditItemGroup from "./Inventory/ItemGroup/EditItemGroup";
import Size from "./Inventory/Size/Size";
import AddSize from "./Inventory/Size/AddSize";
import EditSize from "./Inventory/Size/EditSize";
import RateVersion from "./Inventory/RateVersion/RateVersion.tsx";
import AddRateVersion from "./Inventory/RateVersion/AddRateVersion.tsx";
import EditRateVersion from "./Inventory/RateVersion/EditRateVersion.tsx";
import Items from "./Inventory/Items/Items.tsx";
import AddItem from "./Inventory/Items/AddItem.tsx";
import Item from "./Inventory/Items/Item.tsx";
import CreateInvoice from "./Invoice/CreateInvoice.tsx";
import Signup from "./Auth/Signup.tsx";
import CreateOrganizations from "./Organization/Create.tsx";
import List from "./Organization/List.tsx";
import notFound from "../assets/404.gif";
import EmptyPage from "../components/EmptyPage.tsx";
import Verify from "./Auth/Verfiy.tsx";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import {
	fetchCompanyDetails,
	fetchCurrentUserDetails,
} from "../store/Reducers/UserReducers.ts";

const AppRoutes = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { currentUserDetails, companyDetails } = useAppSelector(
		(state) => state.user
	);

	useEffect(() => {
		const jwtToken = localStorage.getItem(consts.token);
		if (
			!jwtToken &&
			location.pathname !== "/signup" &&
			location.pathname !== "/user/verify"
		) {
			navigate("/auth");
			return;
		}
		dispatch(fetchCompanyDetails());
		dispatch(fetchCurrentUserDetails());
	}, [dispatch]);

	useEffect(() => {
		if (currentUserDetails) {
			if (companyDetails) {
				navigate(location.pathname);
			} else {
				navigate("/organization/new");
			}
		}
	}, [currentUserDetails, companyDetails]);

	return (
		<>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/user/verify" element={<Verify />} />
				<Route path="/organization" element={<List />} />
				<Route path="/organization/new" element={<CreateOrganizations />} />
				{
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
						<Route path="/app/itemgroup" element={<ItemGroup />} />
						<Route path="/app/itemgroup/add" element={<AddItemGroup />} />
						<Route path="/app/itemgroup/:id/edit" element={<EditItemGroup />} />
						<Route path="/app/size" element={<Size />} />
						<Route path="/app/size/add" element={<AddSize />} />
						<Route path="/app/size/:id/edit" element={<EditSize />} />
						<Route path="/app/rateversion" element={<RateVersion />} />
						<Route path="/app/rateversion/add" element={<AddRateVersion />} />
						<Route
							path="/app/rateversion/:id/edit"
							element={<EditRateVersion />}
						/>
						<Route path="/app/items" element={<Items />} />
						<Route path="/app/items/add" element={<AddItem />} />
						<Route path="/app/items/:id" element={<Item />} />
						<Route
							path="/app/rateversion/:id/edit"
							element={<EditRateVersion />}
						/>
						<Route path="/app/sales/invoice/add" element={<CreateInvoice />} />
						<Route path="/app/*" />
					</Route>
				}
				<Route
					path="*"
					element={
						<EmptyPage
							heading="Page not found!"
							image={notFound}
							description="The page you are looking for is avaliable"
						/>
					}
				/>
			</Routes>
		</>
	);
};

export default AppRoutes;
