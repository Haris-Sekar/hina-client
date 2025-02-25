/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { Customer, PaymentTerm } from "../../Types/Customer";
import { API } from "../axios";
import { toastPromise } from "../../Constants/commonFunctions";

async function addCustomer(customerData: Customer) {
	const args = {
		name: customerData.customerName,
		customer_type: customerData.customerType,
		customer_code: customerData.customerCode,
		email: customerData.email,
		phone: customerData.phone ? Number(customerData.phone) : undefined,
		tax_number: customerData.taxNumber,
		pan_number: customerData.panCard,
		opening_balance: customerData.openingBalance,
		payment_terms: customerData.paymentTerms,
		billing_address: {
			line_1: customerData.billingAddress?.addressLine1,
			line_2: customerData.billingAddress?.addressLine2,
			city: customerData.billingAddress?.city,
			state: customerData.billingAddress?.state,
			country: customerData.billingAddress?.country,
			zip_code: customerData.billingAddress?.zipCode,
		},
		shipping_address: {
			line_1: customerData.shippingAddress?.addressLine1,
			line_2: customerData.shippingAddress?.addressLine2,
			city: customerData.shippingAddress?.city,
			state: customerData.shippingAddress?.state,
			country: customerData.shippingAddress?.country,
			zip_code: customerData.shippingAddress?.zipCode,
		},
	};

	const parsedArgs = deepRemoveUndefined(args);

	return toast.promise(API.post(`/customers/create`, parsedArgs), {
		loading: "Adding Customer",
		success: "Customer Added Successfully",
		error: (err: any) => err.message,
	});
}

async function updateCustomer(customerData: Customer) {
	const args = {
		name: customerData.customerName,
		customer_type: customerData.customerType, 
		email: customerData.email,
		phone: customerData.phone ? Number(customerData.phone) : undefined,
		tax_number: customerData.taxNumber,
		pan_number: customerData.panCard, 
		payment_terms: customerData.paymentTerms,
		billing_address: {
			id: customerData.billingAddress?.id,
			line_1: customerData.billingAddress?.addressLine1,
			line_2: customerData.billingAddress?.addressLine2,
			city: customerData.billingAddress?.city,
			state: customerData.billingAddress?.state,
			country: customerData.billingAddress?.country,
			zip_code: customerData.billingAddress?.zipCode,
		},
		shipping_address: {
			id: customerData.shippingAddress?.id,
			line_1: customerData.shippingAddress?.addressLine1,
			line_2: customerData.shippingAddress?.addressLine2,
			city: customerData.shippingAddress?.city,
			state: customerData.shippingAddress?.state,
			country: customerData.shippingAddress?.country,
			zip_code: customerData.shippingAddress?.zipCode,
		},
	};

	const parsedArgs = deepRemoveUndefined(args);  
	return toast.promise(
		API.patch(
			`/customers/update/${customerData.id}`,
			parsedArgs
		),
		{
			loading: "Updating Customer",
			success: "Customer Updated Successfully",
			error: (err: any) => err.message,
		}
	);
}

async function deleteCustomer(customerIds: number[]) {
	return toast.promise(
		API.delete(`/customers`, { params: { ids: customerIds } }),
		{
			loading: "Deleting Customer" + (customerIds.length > 0 ? "s" : ""),
			success:
				"Customer" +
				(customerIds.length > 0 ? "s " : " ") +
				"Deleted Successfully",
			error: (err: any) => err.message,
		}
	);
} 

const addPaymentTerms = async (paymentTerms: PaymentTerm) => {
	return toastPromise(
		API.post(`/customers/payment-terms`, {
			name: paymentTerms.name,
			number_of_days: paymentTerms.numberOfDays,
			is_default: paymentTerms.isDefault,
		}),
		{
			loading: "Adding Payment Term",
			success: "Payment Term Added Successfully",
			error: (err: any) => err.message,
		}
	);
};

const updatePaymentTerms = async (paymentTerms: PaymentTerm) => { 
	return toastPromise(
		API.patch(`/customers/payment-terms/${paymentTerms.id}`, {
			name: paymentTerms.name,
			number_of_days: paymentTerms.numberOfDays,
			is_default: paymentTerms.isDefault,
		}),
		{
			loading: "Updating Payment Term",
			success: "Payment Term Updated Successfully",
			error: (err: any) => err.message,
		}
	);
};

const deletePaymentTerms = async (ids: number[]) => {
	return toastPromise(
		API.delete(`/customers/payment-terms`, { data: { ids } }),
		{
			loading: "Deleting Payment Terms",
			success: "Payment Terms Deleted Successfully",
			error: (err: any) => err.message,
		}
	);
};

export {
	addCustomer,
	updateCustomer,
	deleteCustomer, 
	addPaymentTerms,
	updatePaymentTerms,
	deletePaymentTerms,
};

function deepRemoveUndefined(obj: any): object {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([_, v]) => v !== undefined)
			.map(([k, v]) => [k, v === Object(v) ? deepRemoveUndefined(v) : v])
	);
}
