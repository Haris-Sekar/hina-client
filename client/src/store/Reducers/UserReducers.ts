import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User";
import { Company } from "../../Types/Company";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";

interface UserState {
    users: User[],
    currentUserDetails: User | null
    companyDetails: Company | null;
    loading: boolean;
    error: APIError;
}

const initialState: UserState = {
    users: [],
    currentUserDetails: null,
    companyDetails: null,
    loading: false,
    error: {
        message: ""
    }
}

export const fetchCurrentUserDetials = createAsyncThunk<{ userDetails: User, companyDetails: Company }, void, { rejectValue: string }>(
    "users/fetchCurrentUserDetails",
    async (_, thunkApi) => {
        try {
            const { data } = await API.get('/user');
            return { userDetails: data.userDetials, companyDetails: data.companyDetails }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message);
        }
    }
)

export const UserReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
        populateCurrentUserDetails: (state, action: PayloadAction<User>) => {
            state.currentUserDetails = action.payload;
        },
        populateCompanyDetails: (state, action: PayloadAction<Company>) => {
            state.companyDetails = action.payload
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUserDetials.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUserDetials.fulfilled, (state, action) => {
                state.currentUserDetails = action.payload.userDetails;
                state.companyDetails = action.payload.companyDetails;
                state.loading = false;
            })
            .addCase(fetchCurrentUserDetials.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
    }
});

export default UserReducer.reducer;
export const { createUser, populateCurrentUserDetails, populateCompanyDetails } = UserReducer.actions;