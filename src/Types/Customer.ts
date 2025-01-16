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
    billingAddress?: Address
    shippingAddress?: Address,
    openingBalance?: number,
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

interface MainArea {
    mainAreaId: number;
    name: string;
    createdBy: User;
    createdTime: number;
    updatedBy: User;
    updatedTime: number;
}

interface customerRowData {
    id: number;
    companyName: string;
    name: string;
    phoneNumber: number;
    email: string;
    gst: string;
    mainArea: string;
}

interface mainAreaRowData {
    id: number;
    name: string;
}


export type { Customer, MainArea, customerRowData, mainAreaRowData }