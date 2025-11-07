import { User } from "./User";

interface ItemGroup {
  groupId?: number;
  name: string;
  description: string;
  hsnCode?: string;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

interface ItemGroupRowData {
  id?: number;
  name: string;
  description: string;
  hsnCode?: string;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

interface Size {
  id: number;
  name: string;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

interface SizeRowData {
  id: number;
  name: string;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
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
  quantity: number;
  manageStock: boolean;
  reorderPoint: number;
  isActive?: boolean | true;
  rate?: Rate;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

interface RateVersion {
  id: number;
  name: string;
  isDefault?: boolean;
  isActive?: boolean;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

interface RateVersionRowData {
  id: number;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

interface Rate {
  id: number;
  versionId?: number;
  itemId?: number;
  sizeId?: number;
  costPrice: number;
  sellingPrice: number;
  createdBy?: User;
  createdTime?: number;
  updatedBy?: User;
  updatedTime?: number;
}

export type {
  ItemGroup,
  ItemGroupRowData,
  Size,
  SizeRowData,
  Item,
  RateVersion,
  Rate,
  RateVersionRowData,
};
