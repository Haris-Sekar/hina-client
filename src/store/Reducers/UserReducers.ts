/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Permission, Role, User } from "../../Types/User";
import { Company } from "../../Types/Company";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import {
  companyDetailsConst,
  userDetailsConst,
} from "../../Constants/CommonConstants";
import { fetchUserRoleAndPermissions } from "../Thunks/UserThunks";

interface UserState {
  users: User[];
  currentUserDetails: User | null;
  companyDetails: Company | null;
  loading: boolean;
  error: APIError;
  userCount: number;
  roles: Role[];
  roleCount: number;
  rolePermissions: Permission[];
  metaDataLoading: boolean;
  loginUserPermissions: Permission[];
  loginUserRole: Role | object;
}

const initialState: UserState = {
  users: [],
  currentUserDetails: null,
  companyDetails: null,
  loading: false,
  error: {
    message: "",
  },
  userCount: 0,
  roles: [],
  roleCount: 0,
  rolePermissions: [],
  metaDataLoading: false,
  loginUserPermissions: [],
  loginUserRole: {},
};

export const fetchCurrentUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("users/fetchCurrentUserDetails", async (_, thunkApi) => {
  try {
    if (localStorage.getItem("TOKEN") === null) {
      return thunkApi.rejectWithValue("Token not found");
    }
    const { data } = await API.post("/users/validate/jwt", {
      token: localStorage.getItem("TOKEN") as string,
    });

    const userDetails: User = {
      firstName: data.data.first_name,
      lastName: data.data.last_name,
      email: data.data.email,
      userId: data.data.id,
      role: data.data.role,
      status: data.data.status,
      isVerified: data.data.is_verified,
      createdTime: data.data.created_time,
      updatedTime: data.data.updated_time,
      createdBy: data.data.created_by,
      updatedBy: data.data.updated_by,
      isSuperAdmin: data.data.is_super_admin,
    };

    localStorage.setItem(userDetailsConst, JSON.stringify(userDetails));
    return userDetails;
  } catch (error: any) {
    localStorage.clear();
    window.location.reload();
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const fetchCompanyDetails = createAsyncThunk<
  Company | null,
  void,
  { rejectValue: string }
>("users/fetchCompanyDetails", async (_, thunkApi) => {
  try {
    const cacheCompanyDetils = localStorage.getItem(companyDetailsConst);

    if (cacheCompanyDetils) {
      return JSON.parse(cacheCompanyDetils);
    }

    const { data } = await API.get("/company");

    if(data.data.length === 0) {
      return null;
    }

    const companyDetails = {
      name: data.data[0].name,
      description: data.data[0].description,
      gstNumber: data.data[0].gst_number,
      companyId: data.data[0].id,
    };

    localStorage.setItem(companyDetailsConst, JSON.stringify(companyDetails));
    return companyDetails;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const fetchUsers = createAsyncThunk<
  User[],
  {
    page?: number;
    range?: number;
    sortBy?: string;
    sortOrder?: string;
    filter?: string;
    userId?: number;
  },
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkApi) => {
  try {
    let api = "/users";

    if (_.page !== undefined && _.range !== undefined) {
      const index = _.page * _.range;
      api = `${api}?index=${index}&range=${_.range}`;
    }

    if (_.userId && _.userId.toString().length > 0) {
      if (api.includes("?")) {
        api = `${api}&id=${_.userId}`;
      } else {
        api = `${api}?id=${_.userId}`;
      }
    }

    const { data } = await API.get(api);
    const users: User[] = [];
    data.data.forEach((user: any) => {
      users.push({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        userId: user.id,
        status: user.status,
        isVerified: user.is_verified,
        createdTime: user.created_time,
        updatedTime: user.updated_time,
        createdBy: user.created_by_user,
        updatedBy: user.updated_by_user,
        role: user.role,
        isSuperAdmin: user.is_super_admin,
      });
    });
    return users;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const fetchUserCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("users/fetchUserCount", async (_, thunkApi) => {
  try {
    const { data } = await API.get("/users/count");
    return data.data.count;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const fetchRoles = createAsyncThunk<
  Role[],
  { page?: number; range?: number; roleId?: number },
  { rejectValue: string }
>("users/fetchRoles", async (_, thunkApi) => {
  try {
    let api = "/users/roles";

    if (_.page !== undefined && _.range !== undefined) {
      const index = _.page * _.range;
      api = `${api}?index=${index}&range=${_.range}`;
    }

    if (_.roleId && _.roleId.toString().length > 0) {
      if (api.includes("?")) {
        api = `${api}&id=${_.roleId}`;
      } else {
        api = `${api}?id=${_.roleId}`;
      }
    }

    const { data } = await API.get(api);
    const roles: Role[] = [];
    data.data.forEach((role: any) => {
      roles.push({
        id: role.id,
        name: role.name,
        description: role.description,
        isDefault: role.is_default,
        isSystemAdded: role.is_system_added,
        createdTime: role.created_time,
        updatedTime: role.updated_time,
        createdBy: role.created_by_user,
        updatedBy: role.updated_by_user,
      });
    });
    return roles;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const fetchRoleCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("users/fetchRoleCount", async (_, thunkApi) => {
  try {
    const { data } = await API.get("/users/roles/count");
    return data.data.count;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const fetchRolePermissions = createAsyncThunk<
  Permission[],
  { roleId?: number },
  { rejectValue: string }
>("users/fetchRolePermissions", async (_, thunkApi) => {
  try {
    const { data } = await API.get(`/users/roles/permissions/${_.roleId}`);
    const permissions = data.data;
    const permissionObj: Permission[] = [];
    permissions.forEach((permission: any) => {
      permissionObj.push({
        id: permission.id,
        module: permission.module,
        role: permission.role,
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
    return permissionObj;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message);
  }
});

export const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    populateCurrentUserDetails: (state, action: PayloadAction<User>) => {
      state.currentUserDetails = action.payload;
    },
    populateCompanyDetails: (state, action: PayloadAction<Company>) => {
      state.companyDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserDetails.pending, (state) => {
        state.metaDataLoading = true;
      })
      .addCase(fetchCurrentUserDetails.fulfilled, (state, action) => {
        state.currentUserDetails = action.payload;
        state.metaDataLoading = false;
      })
      .addCase(fetchCurrentUserDetails.rejected, (state, action) => {
        state.metaDataLoading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.metaDataLoading = true;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.companyDetails = action.payload;
        state.metaDataLoading = false;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchUserCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCount.fulfilled, (state, action) => {
        state.userCount = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCount.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchRoleCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoleCount.fulfilled, (state, action) => {
        state.roleCount = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoleCount.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchRolePermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        state.rolePermissions = action.payload;
        state.loading = false;
      })
      .addCase(fetchRolePermissions.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchUserRoleAndPermissions.pending, (state) => {
        state.metaDataLoading = true;
      })
      .addCase(fetchUserRoleAndPermissions.fulfilled, (state, action) => {
        state.metaDataLoading = false;
        state.loginUserPermissions = action.payload.permissions;
        state.loginUserRole = action.payload.role;
      })
      .addCase(fetchUserRoleAndPermissions.rejected, (state, action) => {
        state.metaDataLoading = false;
        state.error.message = action.error.message || "something went wrong";
      });
  },
});

export default UserReducer.reducer;
export const {
  createUser,
  populateCurrentUserDetails,
  populateCompanyDetails,
} = UserReducer.actions;
