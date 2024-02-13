import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";
import { ItemGroup, Size } from "../../Types/Inventory";



interface inventoryState {
    itemGroup: ItemGroup[];
    size: Size[];
    loading: boolean;
    error: APIError;
}

const initialState: inventoryState = {
    itemGroup: [],
    size: [],
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

    }
})


export default InventoryReducer.reducer;

export const { } = InventoryReducer.actions;