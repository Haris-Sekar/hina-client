import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import { ItemGroup, Size } from "../../Types/Inventory";
import { to } from "@react-spring/web";

export const fetchItemGroup = createAsyncThunk<
    ItemGroup[],
    {
        page?: number;
        range?: number;
        sortBy?: string;
        sortOrder?: string;
        id?: number;
        filters?: object;
    },
    { rejectValue: string }
>("inventory/fetchItemGroup", async (_, thunkApi) => {
    try {
        let api = `/items/groups`;

        if (_.page !== undefined && _.range !== undefined) {
            const index = _.page * _.range;
            api += `?index=${index}&range=${_.range}`;
        }

        if (_.sortBy && _.sortOrder) {
            if (api.includes("?")) {
                api += "&";
            } else {
                api += "?";
            }
            api += `sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
        }

        if (_.id) {
            if (api.includes("?")) {
                api += "&";
            } else {
                api += "?";
            }
            const filter = { ..._.filters, id: _.id };
            api += `filters=${JSON.stringify(filter)}`;
        }

        if (_.filters) {
            if (api.includes("?")) {
                api += "&";
            } else {
                api += "?";
            }
            api += `filters=${JSON.stringify(_.filters)}`;
        }

        const { data } = await API.get(api);

        const groups = data.data.item_groups;

        const parsedGroups: ItemGroup[] = groups.map((group: any) => ({
            groupId: group.id,
            name: group.name,
            description: group.description,
            hsnCode: group.hsn_code,
            createdBy: group.CreatedBy,
            createdTime: group.created_time,
            updatedBy: group.UpdatedBy,
            updatedTime: group.updated_time,
        }));

        return parsedGroups;
    } catch (error: any) {
        return thunkApi.rejectWithValue(
            error?.message || "Failed to fetch item groups"
        );
    }
});

export const fetchSize = createAsyncThunk<
    { size: Size[], total: number },
    {
        page: number;
        range: number;
        sortBy?: string;
        sortOrder?: string;
        id?: number;
    },
    { rejectValue: string }
>("inventory/fetchSize", async (_, thunkApi) => {
    try {
        let api = `/items/sizes`; 
        const index = (_.page) * _.range;
        api += `?index=${index}&range=${_.range}`;

        if (_.sortBy && _.sortOrder) {
            if (api.includes("?")) {
                api += "&";
            } else {
                api += "?";
            }
            api += `sort_by=${_.sortBy}&sort_order=${_.sortOrder}`;
        }
        if (_.id) {
            if (api.includes("?")) {
                api += "&";
            } else {
                api += "?";
            }
            const filter = { id: _.id };
            api += `filters=${JSON.stringify(filter)}`;
        }
        const { data } = await API.get(api);

        const sizes = data.data.sizes;


        console.log(sizes);


        const parsedSizes: Size[] = sizes.map((size: any) => ({
            id: size.id,
            name: size.name,
            createdBy: size.CreatedBy,
            createdTime: size.created_time,
            updatedBy: size.UpdatedBy,
            updatedTime: size.updated_time,
        }));
        return { size: parsedSizes, total: data.data.total };
    } catch (error: any) {
        return thunkApi.rejectWithValue(error?.message || "Failed to fetch sizes");
    }
});
