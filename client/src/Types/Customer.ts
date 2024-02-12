import { User } from "./User";

interface Customer {
    customerId: number;
    firstName: string,
    lastName: string,
    companyName: string,
    phoneNumber: number,
    email: string,
    gstNumber: string,
    address1: string,
    address2: string,
    mainAreaId: number,
    createdTime: number;
    updatedTime: number;
    createdBy: User;
    updatedBy: User;
    mainArea: MainArea;
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