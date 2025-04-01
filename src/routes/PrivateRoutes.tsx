/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import PageLayout from "../pages/Layout/PageLayout";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  fetchCompanyDetails,
  fetchCurrentUserDetails,
} from "../store/Reducers/UserReducers";
import { Box, CircularProgress } from "@mui/material";
import { token } from "../Constants/CommonConstants";
import SettingsRoutes from "../pages/Settings/SettingsRoutes";
import { AuthGuard } from "./AuthGaurd";
import { fetchUserRoleAndPermissions } from "../store/Thunks/UserThunks";

const DashboardPage = lazy(() => import("../pages/Dashboard/Dashboard"));
const CustomerPage = lazy(() => import("../pages/Customer/Customer"));
const AddCustomerPage = lazy(() => import("../pages/Customer/AddCustomer"));
const EditCustomerPage = lazy(() => import("../pages/Customer/EditCustomer"));

function PrivateRoutes() {
  const dispatch = useAppDispatch();

  const { metaDataLoading, currentUserDetails, companyDetails } =
    useAppSelector((state) => state.user);

  const [isVerified, setIsVerified] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem(token);
    if (!jwtToken) {
      navigate("/auth");
    }
    dispatch(fetchCurrentUserDetails());
    dispatch(fetchCompanyDetails());
  }, [dispatch]);
 
  useEffect(() => {
    if (currentUserDetails) {
      if (companyDetails) {
        setIsVerified(true);
        dispatch(fetchUserRoleAndPermissions());
      } else {
        navigate("/organization/new");
      }
    }
  }, [currentUserDetails, companyDetails]);

  return (
    <>
      {!metaDataLoading && isVerified ? (
        <Routes>
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
            <Route path="/sales/customer" element={<CustomerPage />} />
            <Route path="/sales/customer/add" element={<AddCustomerPage />} />
            <Route
              path="/sales/customer/edit/:id"
              element={<EditCustomerPage />}
            />
            <Route path="*" />
          </Route>
        </Routes>
      ) : (
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
      )}
    </>
  );
}

export default PrivateRoutes;
