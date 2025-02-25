/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IModule } from "../../Types/Module";
import { API } from "../../api/axios";

export const fetchModules = createAsyncThunk<
    IModule[],
    { page?: number; range?: number, sortBy?: string, sortOrder?: string, id?: number },
    { rejectValue: string }
>("customization/fetchModules", async (_, thunkApi) => {
    try {

        let api = `/modules`;

        if (_.page !== undefined && _.range !== undefined) {
            const index = _.page * _.range;
            api = `${api}?index=${index}&range=${_.range}`
        }

        if (_.sortBy && _.sortOrder) {
            api = `${api}&sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
        }

        if (_.id) {
            api = `${api}&id=${_.id}`;
        }

        const { data } = await API.get(api);
        const modules = data.data.modules;

        return modules.map((module: { id: any; name: any; is_active: any; created_by_user: any; created_time: any; updated_by_user: any; updated_time: any; }) => {
            return {
                id: module.id,
                name: module.name,
                isActive: module.is_active,
                createdBy: module.created_by_user,
                createdTime: module.created_time,
                updatedBy: module.updated_by_user,
                updatedTime: module.updated_time,
            }
        })

    } catch (error) {
        return thunkApi.rejectWithValue("Failed to fetch modules");
    }
});

export const fetchModuleCount = createAsyncThunk<number, void, { rejectValue: string }>(
    "customization/fetchModuleCount",
    async (_, thunkApi) => {
        try {
            const { data } = await API.get('/modules/count');
            return data.data.count;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error?.message);
        }
    }
)