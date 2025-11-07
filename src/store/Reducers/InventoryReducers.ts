import { createSlice } from "@reduxjs/toolkit";
import APIError from "../../Types/APIError";
import { ItemGroup, RateVersion, Size } from "../../Types/Inventory";
import {
  fetchItemGroup,
  fetchRateVersion,
  fetchSize,
} from "../Thunks/InventoryThunks";

interface inventoryState {
  itemGroups: ItemGroup[];
  totalSize: number;
  sizes: Size[];
  loading: boolean;
  error: APIError;
  itemWithRates: [];
  rateVersions: RateVersion[];
  totalRateVersion: number;
}

const initialState: inventoryState = {
  itemGroups: [],
  totalSize: 0,
  sizes: [],
  loading: false,
  itemWithRates: [],
  rateVersions: [],
  totalRateVersion: 0,
  error: {
    message: "",
  },
};
export const InventoryReducer = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemGroup.fulfilled, (state, action) => {
        state.itemGroups = action.payload;
        state.loading = false;
      })
      .addCase(fetchItemGroup.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSize.fulfilled, (state, action) => {
        state.sizes = action.payload.size;
        state.totalSize = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchSize.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "something went wrong";
      })
      .addCase(fetchRateVersion.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRateVersion.fulfilled, (state, action) => {
        state.loading = false;
        state.rateVersions = action.payload.rateVersions;
        state.totalRateVersion = action.payload.total;
      })
      .addCase(fetchRateVersion.rejected, (state, action) => {
        state.loading = false;
        state.error.message = action.error.message || "Something went wrong";
      });
  },
});
