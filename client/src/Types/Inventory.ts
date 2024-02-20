import { User } from "./User";

interface ItemGroup {
    groupId: number;
    name: string;
    createdBy: User;
    createdTime: number;
    updatedBy: User;
    updatedTime: number;
    companyId: number;
}

interface ItemGroupRowData {
    id: number;
    name: string;
}

interface Size {
    sizeId: number;
    size: string;
    createdBy: User;
    createdTime: number;
    updatedBy: User;
    updatedTime: number;
    companyId: number;
}

interface SizeRowData {
    id: number;
    size: string;
}

interface RateVersion {
    versionId: number;
    name: string;
    isDefault: boolean;
    createdBy: User;
    updatedBy: User;
    createdTime: number;
    updatedTime: number;
    companyId: number;
}

interface RateVersionRowData {
    id: number;
    name: string;
    isDefault: boolean;
}

interface Item {
    itemId: number;
    itemName: string;
    hsnCode: number;
    itemGroupId: ItemGroup;
    createdBy: User;
    createdTime: number;
    updatedBy: User;
    updatedTime: number;
    companyId: number;
    rateObject: RateObject;
}

interface RateObject {
    versionId: number;
    rates: Rate[]
}

interface Rate {
    sizeId: number;
    itemId?: number;
    versionId: number;
    costPrice: number;
    sellingPrice: number;
    createdBy?: User;
    createdTime?: number;
    updatedBy?: User;
    updatedTime?: number;
    uuid?: string;
}

interface ItemRowData {
    id: number;
    itemName: string;
    hsnCode: number;
    itemGroup: string;
}


export type { ItemGroup, ItemGroupRowData, Size, SizeRowData, Item, ItemRowData, RateVersion, RateVersionRowData, RateObject }