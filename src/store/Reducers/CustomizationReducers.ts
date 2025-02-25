import { createSlice } from "@reduxjs/toolkit";
import { IModule } from "../../Types/Module";
import { fetchModuleCount, fetchModules } from "../Thunks/CustomizationThunks";
import APIError from "../../Types/APIError";

interface CustomizationState {
    modules: IModule[],
    moduleCount: number,
    loading: boolean;
	error: APIError;
}

const initialState: CustomizationState = {
    modules: [],
    moduleCount: 0,
    loading: false,
	error: { message: "" }
}

export const CustomizationReducer = createSlice({
    name: "customization",
    initialState,
    reducers: {
        emptyCustomization: (state) => {
            state.modules = [];
            state.moduleCount = 0;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchModules.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchModules.fulfilled, (state, action) => {
                state.modules = action.payload;
                state.loading = false;
            })
            .addCase(fetchModules.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || "something went wrong";
            })
            .addCase(fetchModuleCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchModuleCount.fulfilled, (state, action) => {
                state.moduleCount = action.payload;
                if (action.payload === 0) {
                    state.loading = false;
                }
            })
            .addCase(fetchModuleCount.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || "something went wrong";
            })
    }
});