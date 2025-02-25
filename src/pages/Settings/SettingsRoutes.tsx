import { Route, Routes } from "react-router-dom";
import Users from "./UserManagement/Users";
import Settings from "./Settings";
import AddUser from "./UserManagement/AddUser";
import Modules from "./Customization/Modules";
import Roles from "./UserManagement/Roles";
import RolePermissions from "./UserManagement/RolePermissions";

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Settings />}>
        <Route path="users" element={<Users />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="roles" element={<Roles />} />
        <Route path="roles/:id" element={<RolePermissions />} />
        <Route path="modules" element={<Modules />} />
      </Route>
    </Routes>
  );
};

export default SettingsRoutes;
