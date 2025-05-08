import { User } from "./User";

interface ItemGroup {
  groupId?: number;
  name: string;
  description: string;
  hsnCode?: string;
  createdBy: User;
  createdTime: number;
  updatedBy: User;
  updatedTime: number;
}

interface ItemGroupRowData {
  id?: number;
  name: string;
  description: string;
  hsnCode?: string;
  createdBy: User;
  createdTime: number;
  updatedBy: User;
  updatedTime: number;
}

interface Size {
  id: number;
  name: string;
  createdBy: User;
  createdTime: number;
  updatedBy: User;
  updatedTime: number;
}

interface SizeRowData {
  id: number;
  name: string;
  createdBy: User;
  createdTime: number;
  updatedBy: User;
  updatedTime: number;
}


interface Item {
  id: number;
  itemGroup: ItemGroup;
  name: string;
  description: string;
  sku: string;
  barcode: string;
  hsnCode?: string;
  hasSize: boolean;
  unitOfMeasure: string;
  unitOfBill: string;
  reorderPoint: number;
  isActive: boolean;
  createdBy: User;
  createdTime: number;
  updatedBy: User
  updatedTime: number;
}

export type { ItemGroup, ItemGroupRowData, Size, SizeRowData };
