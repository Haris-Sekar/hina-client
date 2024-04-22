import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";
import { Item, ItemGroup, RateVersion, Size } from "../../Types/Inventory";



interface inventoryState {
    itemGroup: ItemGroup[];
    size: Size[];
    rateVersion: RateVersion[];
    items: Item[];
    itemCount: number;
    loading: boolean;
    error: APIError;
    itemWithRates: [];
}

const initialState: inventoryState = {
    itemGroup: [],
    size: [],
    rateVersion: [],
    items: [],
    itemCount: 0,
    loading: false,
    itemWithRates: [],
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

export const fetchItem = createAsyncThunk<{ data: Item[], isRate: boolean }, { itemId?: number, page?: number, range?: number, withRate?: boolean }, { rejectValue: string }>
    ("inventory/fetchItem", async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId

            if (_.itemId && _.itemId.toString().length > 0) {
                const { data } = await API.get(`/company/${companyId}/products?itemId=${_.itemId}`)
                return data;
            } else {
                if (_.page !== undefined && _.range !== undefined) {
                    let index = (_.page * _.range);
                    const { data } = await API.get(`/company/${companyId}/products?index=${index}&range=${_.range}&withRate=${_.withRate}`)
                    return { data: data.result, isRate: _.withRate };
                }
            }
            const { data } = await API.get(`/company/${companyId}/products`);
            return data.result;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message);
        }
    })

export const fetchItemCount = createAsyncThunk<number, void, { rejectValue: string }>
    ("inventory/fetchItemCount", async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            const { data } = await API.get(`/company/${companyId}/products/count`);
            return data.count;
        } catch (error: any) {
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
                if (action.payload.isRate) {
                    state.itemWithRates = action.payload.data;

                } else {
                    state.items = action.payload.data;
                }
                state.loading = false;
            })
            .addCase(fetchItem.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchItemCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItemCount.fulfilled, (state, action) => {
                state.itemCount = action.payload;
                state.loading = false;
            })
            .addCase(fetchItemCount.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })

    }
});

