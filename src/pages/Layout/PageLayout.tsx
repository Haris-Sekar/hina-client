import { Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "../../store/store";
import React, { useEffect } from "react";
import {
	companyDetailsConst,
	token,
	userDetailsConst,
} from "../../Constants/CommonConstants";
import { AppProvider } from "@toolpad/core/react-router-dom"; // React Router
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { sidebarItems } from "../../Constants/MenuItems";
import { Authentication, Router, Session } from "@toolpad/core/AppProvider";

import Logo from "../../components/Logo";
import SideBarFooter from "./SideBarFooter";

const PageLayout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem(token)) {
			navigate("/auth");
		}
	}, []);

	const customerLoading = useAppSelector((state) => state.customer.loading);
	const userLoading = useAppSelector((state) => state.user.loading);
	const inventoryLoading = useAppSelector((state) => state.inventory.loading);

	const { companyDetails, currentUserDetails } = useAppSelector(
		(state) => state.user
	);

	const [pathname, setPathname] = React.useState("/app");

	const router = React.useMemo<Router>(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path) => {
				navigate(`/app${path}`);
				setPathname(String(path));
			},
		};
	}, [pathname]);

	useEffect(() => {
		router.navigate(location.pathname.split("/app")[1]);
	}, []);

	const [session, setSession] = React.useState<Session | null>();

	useEffect(() => {
		if (currentUserDetails) {
			setSession({
				user: {
					name:
						currentUserDetails?.firstName + " " + currentUserDetails?.lastName,
					email: currentUserDetails?.email,
					image: currentUserDetails?.firstName,
					id: String(currentUserDetails?.userId),
				},
			});
		}
	}, [currentUserDetails]);

	const auth: Authentication = {
		signIn: () => {},
		signOut: () => {
			localStorage.removeItem(token);
			localStorage.removeItem(userDetailsConst);
			localStorage.removeItem(companyDetailsConst);
			navigate("/auth");
		},
	};

	return (
		<div className="pageLayoutContainer">
			<AppProvider
				navigation={sidebarItems}
				router={router}
				branding={{
					logo: <Logo />,
					title: companyDetails?.name,
					homeUrl: "/dashboard",
				}}
				authentication={auth}
				session={session}
			>
				<DashboardLayout
					slots={{
						sidebarFooter: SideBarFooter,
					}}
					disableCollapsibleSidebar
					navigation={sidebarItems}
				>
					<div className="main">
						{(customerLoading || userLoading || inventoryLoading) && (
							<LinearProgress />
						)}
						<Outlet />
					</div>
				</DashboardLayout>
			</AppProvider>
		</div>
	);
};

export default PageLayout;
