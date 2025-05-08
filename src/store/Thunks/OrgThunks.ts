import { createAsyncThunk } from "@reduxjs/toolkit";
import { Company } from "../../Types/Company";
import { API } from "../../api/axios";

export const fetchOrgs = createAsyncThunk<Company[], void, { rejectValue: string }>(
    "org/fetchOrgs",
    async (_, thunkApi) => {
        try {
            const { data } = await API.get(`/company`);

            console.log(data);

            if(Array.isArray(data.data)) {
                const orgs: Company[] = data.data.map((org: any) => ({
                    companyId: org.id,
                    name: org.name,
                    description: org.description,
                    gstNumber: org.gst_number,
                    createdBy: org.CreatedBy,
                    createdTime: org.created_time,
                    updatedBy: org.UpdatedBy,
                    updatedTime: org.updated_time,
                }));
                return orgs;
            } else {
                return [];
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message || "Failed to fetch organizations");
        }
    }
)