/* eslint-disable react-hooks/exhaustive-deps */
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { IconButton, Stack, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import { CustomThemeProvider } from "../../theme";
const ToolbarActions = () => {
  const navigate = useNavigate();
  const { orgId } = useParams();

  return (
    <Stack direction="row" spacing={2}>
      <IconButton onClick={() => navigate(`/app/${orgId}`)}>
        <CloseIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </Stack>
  );
};

const SettingTitle = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
      <SettingsOutlinedIcon sx={{ fontSize: "30px" }} />
      <Typography variant="h5" sx={{ fontWeight: "500", userSelect: "none" }}>
        Settings
      </Typography>
    </Stack>
  );
};

const Settings = () => {
  const { orgId } = useParams();

  const settingsSidebar: Navigation = [
    {
      title: "My Account",
      kind: "page",
      icon: <AccountCircleOutlinedIcon />,
      segment: "account",
    },
    {
      title: "Organization",
      kind: "page",
      icon: <BusinessOutlinedIcon />,
      segment: "organization",
    },
    {
      title: "Customization",
      kind: "header",
    },
    {
      title: "Appearance",
      kind: "page",
      icon: <ContrastOutlinedIcon />,
      segment: "appearance",
    },
    {
      title: "Modules",
      kind: "page",
      icon: <GridViewOutlinedIcon />,
      segment: "modules",
    },
    {
      kind: "header",
      title: "Roles & User Management",
    },
    {
      title: "Roles",
      kind: "page",
      icon: <AssignmentIndOutlinedIcon />,
      segment: "roles",
    },
    {
      title: "Users",
      kind: "page",
      icon: <PeopleAltOutlinedIcon />,
      segment: "users",
    },
  ];

  const [pathname, setPathname] = React.useState(`/app/${orgId}/settings/`);

  useEffect(() => {
    router.navigate(location.pathname.split(`/app/${orgId}/settings/`)[1]);
  }, []);

  const navigate = useNavigate();

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (String(path).startsWith("/")) {
          navigate(`/app/${orgId}/settings${path}`);
        } else {
          navigate(`/app/${orgId}/settings/${path}`);
        }
        setPathname(String(path));
      },
    };
  }, [pathname]);

  return (
    <AppProvider navigation={settingsSidebar} router={router}>
      <CustomThemeProvider>
        <DashboardLayout
          disableCollapsibleSidebar
          slots={{
            toolbarActions: ToolbarActions,
            appTitle: SettingTitle,
          }}
        >
          <Outlet />
        </DashboardLayout>
      </CustomThemeProvider>
    </AppProvider>
  );
};

export default Settings;
