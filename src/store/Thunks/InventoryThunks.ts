/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import { ItemGroup, RateVersion, Size } from "../../Types/Inventory";

export const fetchItemGroup = createAsyncThunk<
  ItemGroup[],
  {
    page?: number;
    range?: number;
    sortBy?: string;
    sortOrder?: string;
    id?: number;
    filters?: object;
  },
  { rejectValue: string }
>("inventory/fetchItemGroup", async (_, thunkApi) => {
  try {
    let api = `/items/groups`;

    if (_.page !== undefined && _.range !== undefined) {
      const index = _.page * _.range;
      api += `?index=${index}&range=${_.range}`;
    }

    if (_.sortBy && _.sortOrder) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      api += `sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
    }

    if (_.id) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      const filter = { ..._.filters, id: _.id };
      api += `filters=${JSON.stringify(filter)}`;
    }

    if (_.filters) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      api += `filters=${JSON.stringify(_.filters)}`;
    }

    const { data } = await API.get(api);

    const groups = data.data.item_groups;

    const parsedGroups: ItemGroup[] = groups.map((group: any) => ({
      groupId: group.id,
      name: group.name,
      description: group.description,
      hsnCode: group.hsn_code,
      createdBy: group.CreatedBy,
      createdTime: group.created_time,
      updatedBy: group.UpdatedBy,
      updatedTime: group.updated_time,
    }));

    return parsedGroups;
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error?.message || "Failed to fetch item groups"
    );
  }
});

export const fetchSize = createAsyncThunk<
  { size: Size[]; total: number },
  {
    page: number;
    range: number;
    sortBy?: string;
    sortOrder?: string;
    id?: number;
  },
  { rejectValue: string }
>("inventory/fetchSize", async (_, thunkApi) => {
  try {
    let api = `/items/sizes`;
    const index = _.page * _.range;
    api += `?index=${index}&range=${_.range}`;

    if (_.sortBy && _.sortOrder) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      api += `sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
    }
    if (_.id) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      const filter = { id: _.id };
      api += `filters=${JSON.stringify(filter)}`;
    }
    const { data } = await API.get(api);

    const sizes = data.data.sizes;

    const parsedSizes: Size[] = sizes.map((size: any) => ({
      id: size.id,
      name: size.name,
      createdBy: size.CreatedBy,
      createdTime: size.created_time,
      updatedBy: size.UpdatedBy,
      updatedTime: size.updated_time,
    }));
    return { size: parsedSizes, total: data.data.total };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.message || "Failed to fetch sizes");
  }
});

export const fetchRateVersion = createAsyncThunk<
  { rateVersions: RateVersion[]; total: number },
  {
    page: number;
    range: number;
    sortBy?: string;
    sortOrder?: string;
    id?: number;
  },
  { rejectValue: string }
>("inventory/fetchRateVersions", async (_, thunkApi) => {
  try {
    let api = `/items/rate-version`;
    const index = _.page * _.range;
    api += `?index=${index}&range=${_.range}`;

    if (_.sortBy && _.sortOrder) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      api += `sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
    }
    if (_.id) {
      if (api.includes("?")) {
        api += "&";
      } else {
        api += "?";
      }
      const filter = { id: _.id };
      api += `filters=${JSON.stringify(filter)}`;
    }
    const { data } = await API.get(api);

    const rateVersions = data.data.rate_versions;

    const parsedRateVersions: RateVersion[] = rateVersions.map(
      (rateVersion: any) => ({
        id: rateVersion.id,
        name: rateVersion.name,
        isDefault: rateVersion.is_default,
        isActive: rateVersion.is_active,
        createdBy: rateVersion.CreatedBy,
        createdTime: rateVersion.created_time,
        updatedBy: rateVersion.UpdatedBy,
        updatedTime: rateVersion.updated_time,
      })
    );
    return { rateVersions: parsedRateVersions, total: data.data.total };
  } catch (error: any) {
    return thunkApi.rejectWithValue(
      error?.message || "Failed to fetch rate versions"
    );
  }
});
