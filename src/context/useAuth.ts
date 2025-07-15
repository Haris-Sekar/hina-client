import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContextObject";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
	fetchCurrentUserDetails,
	fetchCompanyDetails,
} from "../store/Reducers/UserReducers";
import { fetchUserRoleAndPermissions } from "../store/Thunks/UserThunks"; 

export function useAuth() { 
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const dispatch = useAppDispatch();
	const {
		currentUserDetails,
		companyDetails: reduxCompanyDetails,
		metaDataLoading,
	} = useAppSelector((state) => state.user);

	// Fetch user and company details when authenticated
	useEffect(() => {
		if (context.isAuthenticated) {
			if (!currentUserDetails) dispatch(fetchCurrentUserDetails());
			if (!reduxCompanyDetails) dispatch(fetchCompanyDetails());
		}
	}, [
		context.isAuthenticated,
		dispatch,
		currentUserDetails,
		reduxCompanyDetails,
	]);

	// Fetch user roles and permissions after user details are loaded
	useEffect(() => {
		if (context.isAuthenticated && currentUserDetails && reduxCompanyDetails) {
			dispatch(fetchUserRoleAndPermissions());
		}
	}, [
		context.isAuthenticated,
		currentUserDetails,
		reduxCompanyDetails,
		dispatch,
	]);

	// Keep AuthContext's companyDetails in sync with Redux
	useEffect(() => {
		if (reduxCompanyDetails !== context.companyDetails) {
			context.setCompanyDetails(reduxCompanyDetails ?? null);
		}
	}, [reduxCompanyDetails, context]);

	// isLoading is true if metaDataLoading is true or either detail is missing
	const isLoading = useMemo(
		() =>
			metaDataLoading ||
			(context.isAuthenticated &&
				(!currentUserDetails)) ||
			// Loader while token exists but context not yet initialized
			(typeof window !== "undefined" &&
				localStorage.getItem("TOKEN") &&
				!context.isAuthenticated),
		[
			metaDataLoading,
			context.isAuthenticated,
			currentUserDetails,
			reduxCompanyDetails,
		]
	);

	return {
		...context,
		isLoading,
		currentUserDetails,
		companyDetails: reduxCompanyDetails,
	};
}
