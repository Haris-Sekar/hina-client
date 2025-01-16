import { User } from "./User";

interface Company {
    companyId?: number;
    name: string;
    description: string;
    gstNumber: string;
    ownerDetails?: User
    createdTime?: number
    createdBy?: User
}

export type { Company }