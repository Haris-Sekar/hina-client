import {createInsertQuery, createUpdateQuery, generateUniqueId} from "../config/query.js";
import db from "../config/db.js";

export default class ItemGroup{
    groupId;
    name;
    createdBy;
    createdTime;
    updatedBy;
    updatedTime;
    companyId;
    static tableName = "item_group";

    constructor(name) {
        this.name = name;
    }

    toJSON() {
        return {
            groupId: this.groupId,
            name: this.name,
            createdBy: this.createdBy,
            createdTime: new Date(this.createdTime).toLocaleString(),
            updatedBy: this.updatedBy,
            updatedTime: new Date(this.updatedTime).toLocaleString(),
            companyId: this.companyId
        }
    }

    static async deserializeFromJSON(json) {
        const itemGroup = new ItemGroup(json.name);
        itemGroup.groupId = json.group_id;
        itemGroup.createdBy = json.created_by;
        itemGroup.createdTime = json.created_time;
        itemGroup.updatedBy = json.updated_by;
        itemGroup.updatedTime = json.updated_time;
        itemGroup.companyId = json.company_id;
    }

    async serializeToSQLQuery(userId, isUpdate) {
        const groupId = !isUpdate ? await generateUniqueId(ItemGroup.tableName, "group_id") : this.groupId;
        const currentMillis = Date.now();
        const json = {
            group_id: groupId,
            name: this.name,
            created_by: !isUpdate ? userId : this.createdTime,
            updated_by: userId,
            created_time: !isUpdate ? currentMillis: this.createdTime,
            updated_time: currentMillis,
            company_id: this.companyId
        }
        for (const key in json) {
            if (json[key] === undefined) {
                delete json[key];
            }
        }
        return json;
    }

    async addGroup(userId) {
        const query = createInsertQuery(ItemGroup.tableName, await this.serializeToSQLQuery(userId, false));
        const [result] = await db.query(query);
        return result;
    }

    async updateGroup(userId) {
        const query = createUpdateQuery(ItemGroup.tableName, await this.serializeToSQLQuery(userId, true),`group_id=${this.groupId}`);
        const [result] = await db.query(query);
        return result;
    }




}