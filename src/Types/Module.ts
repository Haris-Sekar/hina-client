import { User } from "./User";

interface IModule {
    id?: number;
    name: string;
    description?: string;
    isActive: boolean;
    isDefault: boolean | false; // Default value set to false
    createdBy: User
    createdTime: number
    updatedBy: User
    updatedTime: number
}

export type { IModule } 