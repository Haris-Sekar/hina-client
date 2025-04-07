import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import { ItemGroup } from "../../Types/Inventory"; 

export const fetchItemGroup = createAsyncThunk<
    ItemGroup[],
    { page?: number; range?: number, sortBy?: string, sortOrder?: string, groupId?: number },
    { rejectValue: string }
>("inventory/fetchItemGroup", async (_, thunkApi) => {
    try { 
        let api = `/items/groups`;

        if (_.page !== undefined && _.range !== undefined) {
            const index = _.page * _.range;
            api += `?index=${index}&range=${_.range}`;
        }

        if (_.sortBy && _.sortOrder) {
            api += `&sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
        } 

        const { data } = await API.get(api);

        const groups = data.data.item_groups;

        const parsedGroups: ItemGroup[] = groups.map((group: any) => ({
            groupId: group.id,
            name: group.name,
            description: group.description,
            createdBy: group.CreatedBy,
            createdTime: group.created_time,
            updatedBy: group.UpdatedBy,
            updatedTime: group.updated_time,
        }));

        return parsedGroups;

    } catch (error: any) {
        return thunkApi.rejectWithValue(error?.message || "Failed to fetch item groups");
    }
});
 