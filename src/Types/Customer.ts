import { User } from "./User";

interface Customer {
    id: number,
    customerCode?: string,
    customerType: "1" | "2",
    status: 'ACTIVE' | "INACTIVE",
    customerName: string,
    displayName: string,
    email?: string,
    phone?: string,
    panCard?: string,
    taxNumber?: string,
    billingAddress?: Address
    shippingAddress?: Address,
    openingBalance?: string,
    currentBalance?: string,
    paymentTerms: number,
    createdTime?: string,
    createdBy?: User
    updatedTime?: string,
    updatedBy?: User  
}

interface Address {
    id?: number,
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    state?: string,
    country?: string,
    zipCode?: string,
}

interface PaymentTerm {
    id?: number;
    name: string;
    numberOfDays: number | undefined;
    isDefault: boolean | false;
}

interface customerRowData {
    id: number,
    customerName: string,
    phone?: string,
    email?: string,
    currentBalance?: string,
    createdTime?: string,
    createdBy?: object,
    updatedTime?: string,
    updatedBy?: object
}

interface mainAreaRowData {
    id: number;
    name: string;
}

interface paymentTermsRowData {
    id: number;
    name: string;
    numberOfDays: number;
}

export type { Customer, PaymentTerm, customerRowData, mainAreaRowData, paymentTermsRowData, Address }