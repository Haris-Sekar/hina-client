import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";
import {Item, ItemGroup, RateVersion, Size} from "../../Types/Inventory";



interface inventoryState {
    itemGroup: ItemGroup[];
    size: Size[];
    rateVersion: RateVersion[];
    items: Item[];
    loading: boolean;
    error: APIError;
}

const initialState: inventoryState = {
    itemGroup: [],
    size: [],
    rateVersion: [],
    items: [],
    loading: false,
    error: {
        message: ""
    }
}
export const fetchItemGroup = createAsyncThunk<ItemGroup[], { itemGroupId?: number }, { rejectValue: string }>
    ("inventory/fetchItemGroup", async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            const { data } = await API.get(`/company/${companyId}/products/itemGroup`)
            return data.result;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message)
        }
    })

export const fetchSize = createAsyncThunk<Size[], { sizeId?: number }, { rejectValue: string }>
    ("inventory/fetchSize", async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            const { data } = await API.get(`/company/${companyId}/products/size`)
            return data.result;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message)
        }
    })

export const fetchRateVersion = createAsyncThunk<RateVersion[], { versionId?: number }, { rejectValue: string }>
("inventory/fetchRateVersion", async (_, thunkApi) => {
    try {
        const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
        const { data } = await API.get(`/company/${companyId}/products/rateVersion`);
        return data.result;

    } catch (error: any) {
        return thunkApi.rejectWithValue(error?.message)
    }
});

export const fetchItem = createAsyncThunk<Item[], {itemId?: number}, {rejectValue: string}>
("inventory/fetchItem", async (_, thunkApi) => {
    try {
        const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId;
        const {data} = await API.get(`/company/${companyId}/products`);
        return data.result;
    } catch(error: any) {
        return thunkApi.rejectWithValue(error?.message);
    }
})



export const InventoryReducer = createSlice({
    name: "inventory",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemGroup.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItemGroup.fulfilled, (state, action) => {
                state.itemGroup = action.payload;
                state.loading = false;
            })
            .addCase(fetchItemGroup.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSize.fulfilled, (state, action) => {
                state.size = action.payload;
                state.loading = false;
            })
            .addCase(fetchSize.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchRateVersion.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRateVersion.fulfilled, (state, action) => {
                state.rateVersion = action.payload;
                state.loading = false;
            })
            .addCase(fetchRateVersion.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItem.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })

    }
})

