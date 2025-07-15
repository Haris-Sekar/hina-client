/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./layout.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import React, { useEffect, useMemo, useState } from "react";
import {
  companyDetailsConst,
  token,
  userDetailsConst,
} from "../../Constants/CommonConstants";
import { AppProvider } from "@toolpad/core/react-router-dom"; // React Router
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { getSideBarItems } from "../../Constants/MenuItems";
import { Authentication, Router, Session } from "@toolpad/core/AppProvider";

import Logo from "../../components/Logo";
import {
  CustomThemeProvider,
  FONT_STORAGE_KEY,
  getAppTheme,
} from "../../theme";
import NavbarRightPanel from "./NavbarRightPanel";
import { fetchUserRoleAndPermissions } from "../../store/Thunks/UserThunks";

const PageLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!localStorage.getItem(token)) {
      navigate("/auth");
      dispatch(fetchUserRoleAndPermissions());
    }
  }, []);

  const { orgId } = useParams();
  const { companyDetails, currentUserDetails, loginUserPermissions } =
    useAppSelector((state) => state.user);
  document.title = companyDetails?.name || "";

  if (companyDetails && companyDetails.companyId && orgId) {
    if (companyDetails?.companyId !== parseInt(orgId)) {
      navigate("/app/organization");
    }
  }
  const [pathname, setPathname] = React.useState(`/app/${orgId}/`);

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (path) {
          if (String(path).startsWith("/")) {
            navigate(`/app/${orgId}${path}`);
          } else {
            navigate(`/app/${orgId}/${path}`);
          }
          setPathname(String(path));
        }
      },
    };
  }, [pathname]);

  useEffect(() => {
    if (location.pathname.includes(`/app/${orgId}/`)) {
      router.navigate(location.pathname.split(`/app/${orgId}/`)[1]);
    }
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

  const sidebarItems = getSideBarItems(loginUserPermissions);

  return (
    <div className="pageLayoutContainer">
      {loginUserPermissions && loginUserPermissions.length > 0 ? (
        <AppProvider
          navigation={sidebarItems}
          router={router}
          branding={{
            logo: <Logo />,
            title: companyDetails?.name,
            homeUrl: "/dashboard",
          }}
          window={window}
          authentication={auth}
          session={session}
        >
          <CustomThemeProvider>
            <DashboardLayout
              slots={{
                toolbarActions: NavbarRightPanel,
              }}
            >
              <Outlet />
            </DashboardLayout>
          </CustomThemeProvider>
        </AppProvider>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageLayout;
