import { Route, Routes } from "react-router-dom";
import Users from "../pages/Settings/UserManagement/Users";
import Settings from "../pages/Settings/Settings";
import AddUser from "../pages/Settings/UserManagement/AddUser";
import Modules from "../pages/Settings/Customization/Modules";
import Roles from "../pages/Settings/UserManagement/Roles";
import RolePermissions from "../pages/Settings/UserManagement/RolePermissions";
import EditUser from "../pages/Settings/UserManagement/EditUser";
import { lazy } from "react";

const Appearance = lazy(
  () => import("../pages/Settings/Customization/Appearance")
);

const MyAccount = lazy(() => import("../pages/Settings/MyAccount"));
const Organization = lazy(() => import("../pages/Settings/Organization"));

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Settings />}>
        <Route path="account" element={<MyAccount />} />
        <Route path="organization" element={<Organization />} />
        <Route path="users" element={<Users />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/:id/edit" element={<EditUser />} />
        <Route path="roles" element={<Roles />} />
        <Route path="roles/:id" element={<RolePermissions />} />
        <Route path="modules" element={<Modules />} />
        <Route path="appearance" element={<Appearance />} />
      </Route>
    </Routes>
  );
};

export default SettingsRoutes;
