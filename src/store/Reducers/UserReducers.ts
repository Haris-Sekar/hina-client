import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User";
import { Company } from "../../Types/Company";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import { companyDetailsConst, userDetailsConst } from "../../Constants/CommonConstants";

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

export const fetchCurrentUserDetails = createAsyncThunk<User, void, { rejectValue: string }>(
    "users/fetchCurrentUserDetails",
    async (_, thunkApi) => {
        try {
            if (localStorage.getItem('TOKEN') === null) {
                return thunkApi.rejectWithValue('Token not found');
            }
            const { data } = await API.post('/users/validate/jwt', { token: localStorage.getItem('TOKEN') as string });

            const userDetails: User = {
                firstName: data.data.first_name,
                lastName: data.data.last_name,
                email: data.data.email,
                userId: data.data.id
            }

            localStorage.setItem(userDetailsConst, JSON.stringify(userDetails));
            return userDetails;
        } catch (error: any) {
            localStorage.removeItem('TOKEN');
            window.location.reload();
            return thunkApi.rejectWithValue(error?.message);
        }
    }
)

export const fetchCompanyDetails = createAsyncThunk<Company, void, { rejectValue: string }>(
    "users/fetchCompanyDetails",
    async (_, thunkApi) => {
        try {

            const cacheCompanyDetils = localStorage.getItem(companyDetailsConst);

            if (cacheCompanyDetils) {
                return JSON.parse(cacheCompanyDetils);
            }

            const { data } = await API.get('/company');

            const companyDetails = {
                name: data.data[0].name,
                description: data.data[0].description,
                gstNumber: data.data[0].gst_number,
                companyId: data.data[0]
            }

            localStorage.setItem(companyDetailsConst, JSON.stringify(companyDetails));
            return companyDetails;
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
            .addCase(fetchCurrentUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUserDetails.fulfilled, (state, action) => {
                state.currentUserDetails = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchCompanyDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
                state.companyDetails = action.payload;
                state.loading = false;
            })
            .addCase(fetchCompanyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
    }
});

export default UserReducer.reducer;
export const { createUser, populateCurrentUserDetails, populateCompanyDetails } = UserReducer.actions;