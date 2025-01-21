/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { Customer, MainArea } from "../../Types/Customer";
import { API } from "../axios";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";

const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company)?.companyId

async function addCustomer(customerData: Customer) {

    return toast.promise(API.post(`/company/${companyId}/customer`, customerData), {
        loading: "Adding Customer",
        success: "Customer Added Successfully",
        error: (err: any) => err.message
    })
}

async function addMainArea(mainAreaData: MainArea) {

    return toast.promise(API.post(`/company/${companyId}/customer/mainArea`, mainAreaData), {
        loading: "Adding Main Area",
        success: "Main Area Added Successfully",
        error: (err: any) => err.message
    })
}

async function updateCustomer(customerData: Customer) {
    return toast.promise(API.patch(`/company/${companyId}/customer/${customerData.id}`, customerData), {
        loading: "Updating Customer",
        success: "Customer Updated Successfully",
        error: (err: any) => err.message
    })
}

async function updateMainArea(mainAreaData: MainArea) {
    return toast.promise(API.patch(`/company/${companyId}/customer/mainArea/${mainAreaData.mainAreaId}`, mainAreaData), {
        loading: "Updating Main Area",
        success: "Main Area Updated Successfully",
        error: (err: any) => err.message
    })
}

async function deleteCustomer(customerIds: number[]) {
    return toast.promise(API.delete(`/company/${companyId}/customer`, { params: { ids: customerIds } }), {
        loading: "Deleting Customer" + (customerIds.length > 0 ? 's' : ""),
        success: "Customer" + (customerIds.length > 0 ? 's ' : " ") + "Deleted Successfully",
        error: (err: any) => err.message
    })
}


async function deleteMainAreas(mainAreaIds: number[]) {
    return toast.promise(API.delete(`/company/${companyId}/customer/mainArea/`, { params: { ids: mainAreaIds } }), {
        loading: "Deleting Main Area" + (mainAreaIds.length > 1 ? 's' : ""),
        success: "Main Area" + (mainAreaIds.length > 1 ? 's ' : " ") + "Deleted Successfully",
        error: (err: any) => err.message
    })
}
export { addCustomer, addMainArea, updateCustomer, deleteCustomer, updateMainArea, deleteMainAreas }