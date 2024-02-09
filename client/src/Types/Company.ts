import { User } from "./User";

interface Company {
    companyId: number;
    name: string;
    address: string;
    gst: string;
    ownerDetails: User
    createdTime: number
    createdBy: User
}

export type { Company }