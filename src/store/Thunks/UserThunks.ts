/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import { Permission, Role, User } from "../../Types/User";

export const fetchAttachments = createAsyncThunk(
  "attachment/fetchAttachments",
  () => API.get("/user") as Promise<User>
);

export const fetchUserRoleAndPermissions = createAsyncThunk<
  { role: Role; permissions: Permission[] },
  void,
  { rejectValue: string }
>("users/fetchUserRoleAndPermissions", async (_, thunkApi) => {
  try {
    const { data } = await API.get(`/users/permissions`);

    const permissions: Permission[] = [];

    data.data.forEach((permission: any) => {
      permissions.push({
        id: permission.id,
        module: {
          id: permission.module.id,
          name: permission.module.name,
          isActive: permission.module.is_active,
          isDefault: permission.module.is_default,
          description: permission.module.description,
          createdTime: permission.module.created_time,
          updatedTime: permission.module.updated_time,
          createdBy: permission.module.created_by_user,
          updatedBy: permission.module.updated_by_user,
        },
        role: {
          id: permission.role.id,
          name: permission.role.name,
          description: permission.role.description,
          isDefault: permission.role.is_default,
          isSystemAdded: permission.role.is_system_added,
          createdTime: permission.role.created_time,
          updatedTime: permission.role.updated_time,
          createdBy: permission.role.created_by_user,
          updatedBy: permission.role.updated_by_user,
        },
        canRead: permission.can_read,
        canDelete: permission.can_delete,
        canCreate: permission.can_create,
        canUpdate: permission.can_update,
        canReadAll: permission.can_read_all,
        canUpdateAll: permission.can_update_all,
        canDeleteAll: permission.can_delete_all,
        createdBy: permission.created_by_user,
        updatedBy: permission.updated_by_user,
        createdTime: permission.created_time,
        updatedTime: permission.updated_time,
      });
    });

    const role = permissions[0].role;
    return { role, permissions };
  } catch (error) {
    return thunkApi.rejectWithValue(error as string);
  }
});
