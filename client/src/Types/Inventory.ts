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

interface Item {
    itemId: number;
    itemName: number;
    hsnCode: number;
    itemGroupId: ;
    createdBy: User;
    createdTime: number;
    updatedBy: User;
    updatedTime: number;
    companyId: number;
}



export type { ItemGroup, ItemGroupRowData, Size, SizeRowData }