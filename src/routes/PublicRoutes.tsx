import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/Auth/Auth"));
const SignupPage = lazy(() => import("../pages/Auth/Signup"));
const VerifyPage = lazy(() => import("../pages/Auth/Verfiy"));
const AcceptInvitePage = lazy(() => import("../pages/Auth/AcceptInvite"));

function PublicRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/app" replace />} />
			<Route path="/auth" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/user/verify" element={<VerifyPage />} />
			<Route path="/user/invite" element={<AcceptInvitePage />} />
		</Routes>
	);
}

export default PublicRoutes;
