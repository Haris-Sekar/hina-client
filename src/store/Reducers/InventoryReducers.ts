import { createSlice } from "@reduxjs/toolkit"; 
import APIError from "../../Types/APIError"; 
import { ItemGroup } from "../../Types/Inventory";
import { fetchItemGroup } from "../Thunks/InventoryThunks";



interface inventoryState {
    itemGroup: ItemGroup[]; 
    loading: boolean;
    error: APIError;
    itemWithRates: [];
}

const initialState: inventoryState = {
    itemGroup: [], 
    loading: false,
    itemWithRates: [],
    error: {
        message: ""
    }
}
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

    }
});

