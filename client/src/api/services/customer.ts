import toast from "react-hot-toast";
import { Customer, MainArea } from "../../Types/Customer";
import { API } from "../axios";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";

const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company).companyId

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

export { addCustomer, addMainArea }