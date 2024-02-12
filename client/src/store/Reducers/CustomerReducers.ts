import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer, MainArea } from "../../Types/Customer";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";


interface customerState {
    customers: Customer[],
    customerCount: number;
    mainAreaCount: number;
    mainAreas: MainArea[],
    loading: boolean;
    error: APIError;
}

const initialState: customerState = {
    customers: [],
    customerCount: 0,
    mainAreaCount: 0,
    mainAreas: [],
    loading: false,
    error: {
        message: ""
    }
}

export const fetchCustomers = createAsyncThunk<Customer[], { page?: number, range?: number, customerId?: number }, { rejectValue: string }>(
    "customer/fetchCustomers",
    async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            if (_.customerId) {
                const { data } = await API.get(`/company/${companyId}/customer?customerId=${_.customerId}`)
                return data.result;
            } else {
                if (_.page !== undefined && _.range !== undefined) {
                    let index = (_.page * _.range);
                    const { data } = await API.get(`/company/${companyId}/customer?index=${index}&range=${_.range}`)
                    return data.result;
                }
            }

        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message);
        }
    }
)

export const fetchCustomersCount = createAsyncThunk<number, void, { rejectValue: string }>(
    "customer/fetchCustomersCount",
    async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            const { data } = await API.get(`/company/${companyId}/customer/count`)
            return data.count;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message);
        }
    }
)

export const fetchMainArea = createAsyncThunk<MainArea[], { mainAreaId?: number }, { rejectValue: string }>
    ("customer/fetchMainArea", async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            const { data } = await API.get(`/company/${companyId}/customer/mainArea`)
            return data.result;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message)
        }
    })

export const fetchMainAreaCount = createAsyncThunk<number, void, { rejectValue: string }>
    ("customer/fetchMainAreaCount", async (_, thunkApi) => {
        try {
            const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId
            const { data } = await API.get(`/company/${companyId}/customer/mainArea/count`)
            return data.count;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message)
        }
    })



export const CustomerReducer = createSlice({
    name: "customer",
    initialState,
    reducers: {
        emptyCustomer: (state, action: PayloadAction<void>) => {
            state.customers = []
        },
        setCustomerLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.customers = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchCustomersCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomersCount.fulfilled, (state, action) => {
                state.customerCount = action.payload;
            })
            .addCase(fetchCustomersCount.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchMainArea.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMainArea.fulfilled, (state, action) => {
                state.mainAreas = action.payload;
                state.loading = false;
            })
            .addCase(fetchMainArea.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
            .addCase(fetchMainAreaCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMainAreaCount.fulfilled, (state, action) => {
                state.mainAreaCount = action.payload;
                state.loading = false;
            })
            .addCase(fetchMainAreaCount.rejected, (state, action) => {
                state.loading = false;
                state.error.message = action.error.message || 'something went wrong'
            })
    }
})


export default CustomerReducer.reducer;

export const { emptyCustomer, setCustomerLoading } = CustomerReducer.actions;