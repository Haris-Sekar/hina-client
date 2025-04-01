import { IModule } from "./Module";

interface IAuthLogin {
    email: string;
    phone: string;
    password: string;
}

interface IAuthSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    roleId?: number;
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "READ_ONLY";
    isVerified?: boolean;
    createdTime?: string;
    updatedTime?: string;
    createdBy?: User;
    updatedBy?: User;
    isSuperAdmin: boolean | false ;
}

interface Role {
    id: number;
    name: string;
    description?: string;
    isDefault?: boolean | false;
    isSystemAdded?: boolean | false;
    createdTime?: string;
    updatedTime?: string;
    createdBy?: User;
    updatedBy?: User;
}

interface Permission {
    id: number;
    module: IModule;
    role: Role;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canReadAll: boolean;
    canUpdateAll: boolean;
    canDeleteAll: boolean;
    createdTime?: string;
    updatedTime?: string;
    createdBy?: User;
    updatedBy?: User;
}

interface userRowData {
    id: number;
    name: string;
    email: string;
    role: object;
    status: string;
    isVerified: boolean;
    createdTime?: string;
    createdBy?: object;
    updatedTime?: string;
    updatedBy?: object;
    isSuperAdmin: boolean | false ;
}


export type { IAuthLogin, IAuthSignup, User, userRowData, Role, Permission };