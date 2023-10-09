import baseUrl from "./index";

const customerBaseUrl = `api/v1/customer`;

export const createCustomer = (formData) => baseUrl.post(customerBaseUrl, formData); 