import { createSlice } from "@reduxjs/toolkit";
import APIError from "../../Types/APIError";
import { Company } from "../../Types/Company";
import { fetchOrgs } from "../Thunks/OrgThunks";

interface OrgState {

    organizations: Company[];
    loading: boolean;
    error: APIError;

}

const initialState: OrgState = {
    organizations: [],
    loading: false,
    error: {
        message: ""
    }
}

export const OrgReducers = createSlice({
    name: "org", initialState, reducers: {}, extraReducers: (builder) => {
        builder
            .addCase(fetchOrgs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrgs.fulfilled, (state, action) => {
                state.loading = false;
                state.organizations = action.payload;
            })
            .addCase(fetchOrgs.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.payload as string;
            })
    }
})