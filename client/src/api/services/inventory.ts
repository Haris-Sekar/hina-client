import toast from "react-hot-toast";
import { API, apiAbortController } from "../axios";
import { companyDetailsConst } from "../../Constants/CommonConstants";
import { Company } from "../../Types/Company";
import { Item, ItemGroup, RateVersion, Size } from "../../Types/Inventory";

const companyId = (JSON.parse(localStorage.getItem(companyDetailsConst) as string) as Company)?.companyId
async function addItemGroup(itemGroupData: ItemGroup) {

    return toast.promise(API.post(`/company/${companyId}/products/itemGroup`, itemGroupData), {
        loading: "Adding Item Group",
        success: "Item group Added Successfully",
        error: (err: any) => err.message
    })
}

async function updateItemGroup(itemGroupData: ItemGroup) {
    return toast.promise(API.patch(`/company/${companyId}/products/itemGroup/${itemGroupData.groupId}`, itemGroupData), {
        loading: "Updating Item Group",
        success: "Item Group Updated Successfully",
        error: (err: any) => err.message
    })
}

async function deleteItemGroup(ids: number[]) {
    return toast.promise(API.delete(`/company/${companyId}/products/itemGroup/`, { params: { ids: ids } }), {
        loading: "Deleting Item Group" + (ids.length > 1 ? 's' : ""),
        success: "Item Group" + (ids.length > 1 ? 's ' : " ") + "Deleted Successfully",
        error: (err: any) => err.message
    })
}


async function addSize(sizeData: Size) {

    return toast.promise(API.post(`/company/${companyId}/products/size`, sizeData), {
        loading: "Adding Size",
        success: "Size Added Successfully",
        error: (err: any) => err.message
    })
}

async function updateSize(sizeData: Size) {
    return toast.promise(API.patch(`/company/${companyId}/products/size/${sizeData.sizeId}`, sizeData), {
        loading: "Updating Size",
        success: "Size Updated Successfully",
        error: (err: any) => err.message
    })
}

async function deleteSize(ids: number[]) {
    return toast.promise(API.delete(`/company/${companyId}/products/size/`, { params: { ids: ids } }), {
        loading: "Deleting Size" + (ids.length > 1 ? '\'s' : ""),
        success: "Size" + (ids.length > 1 ? '\'s ' : " ") + "Deleted Successfully",
        error: (err: any) => err.message
    })
}

async function addRateVersion(versionData: RateVersion) {
    return toast.promise(API.post(`/company/${companyId}/products/rateVersion`, versionData), {
        loading: "Adding rate version",
        success: "Rate version Added Successfully",
        error: (err: any) => err.message
    })
}

async function updateRateVersion(versionData: RateVersion) {
    return toast.promise(API.patch(`/company/${companyId}/products/rateVersion/${versionData.versionId}`, versionData), {
        loading: "Updating rate version",
        success: "Rate version Updated Successfully",
        error: (err: any) => err.message
    })
}

async function deleteRateVersion(ids: number[]) {
    return toast.promise(API.delete(`/company/${companyId}/products/rateVersion/`, { params: { ids: ids } }), {
        loading: "Deleting rate version" + (ids.length > 1 ? '\'s' : ""),
        success: "Rate version" + (ids.length > 1 ? '\'s ' : " ") + "Deleted Successfully",
        error: (err: any) => err.message
    })
}

async function addItem(itemData: Item) {

    return toast.promise(API.post(`/company/${companyId}/products`, itemData), {
        loading: "Adding Item",
        success: "Item Added Successfully",
        error: (err: any) => err.message
    })
}

async function updateItem(itemData: Item) {
    return toast.promise(API.patch(`/company/${companyId}/products/${itemData.itemId}`, itemData), {
        loading: "Updating Item",
        success: "Item Updated Successfully",
        error: (err: any) => err.message
    })
}

async function deleteItem(ids: number[]) {
    return toast.promise(API.delete(`/company/${companyId}/products`, { params: { ids: ids } }), {
        loading: "Deleting Item" + (ids.length > 1 ? 's' : ""),
        success: "Item" + (ids.length > 1 ? 's ' : " ") + "Deleted Successfully",
        error: (err: any) => err.message
    })
}



export { addItemGroup, deleteItemGroup, updateItemGroup, addSize, updateSize, deleteSize, addRateVersion, updateRateVersion, deleteRateVersion, addItem, deleteItem, updateItem };