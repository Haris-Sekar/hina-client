/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { lazy, useEffect } from "react";
import PageLayout from "../pages/Layout/PageLayout";
import { Box, CircularProgress } from "@mui/material";
import SettingsRoutes from "../pages/Settings/SettingsRoutes";
import { AuthGuard } from "./AuthGaurd";
import ItemGroup from "../pages/Inventory/ItemGroup/ItemGroup";
import AddItemGroup from "../pages/Inventory/ItemGroup/AddItemGroup";
import EditItemGroup from "../pages/Inventory/ItemGroup/EditItemGroup";
import Size from "../pages/Inventory/Size/Size";
import AddSize from "../pages/Inventory/Size/AddSize";
import EditSize from "../pages/Inventory/Size/EditSize";
import { useAuth } from "../context/useAuth";

const DashboardPage = lazy(() => import("../pages/Dashboard/Dashboard"));
const CustomerPage = lazy(() => import("../pages/Customer/Customer"));
const AddCustomerPage = lazy(() => import("../pages/Customer/AddCustomer"));
const EditCustomerPage = lazy(() => import("../pages/Customer/EditCustomer"));
const CreateOrganizations = lazy(() => import("../pages/Organization/Create"));
const CompanyList = lazy(() => import("../pages/Organization/List"));

function PrivateRoutes() {
	const { isAuthenticated, isLoading, currentUserDetails, companyDetails } =
		useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Redirect to /auth if not authenticated and not loading
	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate("/auth");
		}
	}, [isAuthenticated, isLoading, navigate]);

	useEffect(() => {
		if (
			isAuthenticated &&
			!isLoading &&
			currentUserDetails &&
			!companyDetails &&
			!location.pathname.startsWith("/app/organization")
		) {
			navigate("/app/organization", { replace: true });
		}
	}, [
		isAuthenticated,
		isLoading,
		currentUserDetails,
		companyDetails,
		location.pathname,
		navigate,
	]);

	return (
		<>
			{isLoading ? (
				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "100vh",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Routes>
					<Route path="/organization" element={<CompanyList />} />
					<Route path="/organization/new" element={<CreateOrganizations />} />
					<Route path="/settings/*" element={<SettingsRoutes />} />
					<Route path="/" element={<PageLayout />}>
						<Route
							path="/dashboard"
							element={
								<AuthGuard accessType="canRead" module="dashboard">
									<DashboardPage />
								</AuthGuard>
							}
						/>
						<Route
							path="/sales/customer"
							element={
								<AuthGuard accessType="canRead" module="customers">
									<CustomerPage />
								</AuthGuard>
							}
						/>
						<Route path="/sales/customer/add" element={<AddCustomerPage />} />
						<Route
							path="/sales/customer/:id/edit"
							element={<EditCustomerPage />}
						/>
						<Route path="/inventory/itemgroup" element={<ItemGroup />} />
						<Route path="/inventory/itemgroup/add" element={<AddItemGroup />} />
						<Route
							path="/inventory/itemgroup/:id/edit"
							element={<EditItemGroup />}
						/>
						<Route path="/inventory/size" element={<Size />} />
						<Route path="/inventory/size/add" element={<AddSize />} />
						<Route path="/inventory/size/:id/edit" element={<EditSize />} />
						<Route path="*" />
					</Route>
				</Routes>
			)}
		</>
	);
}

export default PrivateRoutes;
