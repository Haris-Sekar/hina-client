/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import APIError from "../../Types/APIError";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";
import { Address, Customer, PaymentTerm } from "../../Types/Customer"; 

interface customerState {
	customers: Customer[];
	paymentTerms: PaymentTerm[];
	customerCount: number;
	mainAreaCount: number;
	loading: boolean;
	error: APIError;
}

const initialState: customerState = {
	customers: [],
	customerCount: 0,
	mainAreaCount: 0,
	loading: false,
	error: {
		message: "",
	},
	paymentTerms: [],
};

const parseAddress = (address: any): Address => {
	if (address) {
		return {
			addressLine1: address.address_line_1,
			addressLine2: address.address_line_2,
			city: address.city,
			state: address.state,
			country: address.country,
			zipCode: address.zip_code,
			id: address.id,
		};
	} else {
		return {};
	}
};

export const fetchCustomers = createAsyncThunk<
	Customer[],
	{ page?: number; range?: number; customerId?: number; sortBy?: string, sortOrder?: string },
	{ rejectValue: string }
>("customer/fetchCustomers", async (_, thunkApi) => {
	try {
		if (_.customerId) {
			const { data } = await API.get(`/customers?id=${_.customerId}`);
			const customer = data.data.customer;

			const result = {
				...customer,
				customerName: customer.name,
				currentBalance: customer.current_balance,
				billingAddress: parseAddress(customer?.billing_address),
				shippingAddress: parseAddress(customer?.shipping_address),
				paymentTerms: customer.payment_terms,
				customerType: customer.customer_type,
				customerCode: customer.customer_code,
				createdTime: customer.created_time,
				createdBy: customer.created_by_user,
				updatedTime: customer.updated_time,
				updatedBy: customer.updated_by_user,
			};
			return [result];
		} else {
			if (_.page !== undefined && _.range !== undefined) {
				const index = _.page * _.range;
				let api = `/customers?index=${index}&range=${_.range}`;
				if (_.sortBy && _.sortOrder) {
					api = `${api}&sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
				}
				const { data } = await API.get(api);
				return data.customers.map((customer: any) => {
					return {
						...customer,
						customerName: customer.name,
						currentBalance: customer.current_balance,
						paymentTerms: customer.payment_terms,
						billingAddress: parseAddress(customer?.billing_address),
						shippingAddress: parseAddress(customer?.shipping_address),
						createdTime: customer.created_time,
						createdBy: customer.created_by_user,
						updatedTime: customer.updated_time,
						updatedBy: customer.updated_by_user,
					};
				});
			}
		}
	} catch (error: any) {
		return thunkApi.rejectWithValue(error?.message);
	}
});

export const fetchCustomersCount = createAsyncThunk<
	number,
	void,
	{ rejectValue: string }
>("customer/fetchCustomersCount", async (_, thunkApi) => {
	try {
		const { data } = await API.get(`/customers/count`);
		return data.data.count;
	} catch (error: any) {
		return thunkApi.rejectWithValue(error?.message);
	}
});

export const fetchPaymentTerms = createAsyncThunk<
	PaymentTerm[],
	{ paymentTermId?: number },
	{ rejectValue: string }
>("customer/fetchPaymentTerms", async (_, thunkApi) => {
	try {
		const { data } = await API.get(`/customers/payment-terms`);
		const paymentTerms = data.data.map(
			(term: { name: any; id: any; number_of_days: any; is_default: any }) => {
				return {
					name: term.name,
					id: term.id,
					numberOfDays: term.number_of_days,
					isDefault: term.is_default,
				};
			}
		);

		return paymentTerms;
	} catch (error: any) {
		return thunkApi.rejectWithValue(error?.message);
	}
});

export const fetchMainAreaCount = createAsyncThunk<
	number,
	void,
	{ rejectValue: string }
>("customer/fetchMainAreaCount", async (_, thunkApi) => {
	try {
		const companyId = (
			JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company
		).companyId;
		const { data } = await API.get(
			`/company/${companyId}/customer/mainArea/count`
		);
		return data.count;
	} catch (error: any) {
		return thunkApi.rejectWithValue(error?.message);
	}
});

export const CustomerReducer = createSlice({
	name: "customer",
	initialState,
	reducers: {
		emptyCustomer: (state) => {
			state.customers = [];
		},
		setCustomerLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
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
				state.error.message = action.error.message || "something went wrong";
			})
			.addCase(fetchCustomersCount.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCustomersCount.fulfilled, (state, action) => {
				state.customerCount = action.payload;
				if (action.payload === 0) {
					state.loading = false;
				}
			})
			.addCase(fetchCustomersCount.rejected, (state, action) => {
				state.loading = false;
				state.error.message = action.error.message || "something went wrong";
			})
			.addCase(fetchPaymentTerms.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchPaymentTerms.fulfilled, (state, action) => {
				state.paymentTerms = action.payload;
				state.loading = false;
			})
			.addCase(fetchPaymentTerms.rejected, (state, action) => {
				state.loading = false;
				state.error.message = action.error.message || "something went wrong";
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
				state.error.message = action.error.message || "something went wrong";
			});
	},
});

export default CustomerReducer.reducer;

export const { emptyCustomer, setCustomerLoading } = CustomerReducer.actions;
