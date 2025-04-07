import { User } from "./User";

interface ItemGroup {
  groupId?: number;
  name: string;
  description: string;
  createdBy: User;
  createdTime: number;
  updatedBy: User;
  updatedTime: number;
}

interface ItemGroupRowData {
  id?: number;
  name: string;
  description: string;
  createdBy: User;
  createdTime: number;
  updatedBy: User;
  updatedTime: number;
}

export type { ItemGroup, ItemGroupRowData };
