import {createInsertQuery} from "../config/query.js";
import db from "../config/db.js";

export default class CompanyUserMapping {
    userId
    companyId
    addedTime
    addedBy
    updatedTime
    updatedBy
    static tableName = "company_user_mapping";
    constructor(userId, companyId) {
        this.companyId = companyId;
        this.userId = userId;
    }
    async addCompanyUserMapping(addedBy) {
        const query = createInsertQuery(CompanyUserMapping.tableName, this.serializeToSQLQuery(addedBy));

        const [result] = await db.query(query)

        return result;
    }

    toJson() {
        return {
            userId: this.userId,
            companyId: this.companyId,
            addedTime: new Date(this.addedTime).toLocaleString(),
            addedBy: this.addedBy,
            updatedBy: this.updatedBy,
            updatedTime: new Date(this.updatedTime).toLocaleString(),
        }
    }


    serializeToSQLQuery(userId) {

        const currentTimeMillis = Date.now();

        const json =  {
            company_id: this.companyId,
            user_id: this.userId,
            added_time: currentTimeMillis,
            updated_time: currentTimeMillis,
            added_by: userId,
            updated_by: userId
        }
        for (const key in json) {
            if (json[key] === undefined) {
                delete json[key];
            }
        }
        return json;
    }

    static async deserializeFromJson(json) {
        const userCompanyMapping = new CompanyUserMapping(json.user_id, json.company_id);
        userCompanyMapping.addedBy = json.added_by;
        userCompanyMapping.addedTime = json.added_time;
        userCompanyMapping.updatedTime = json.updated_time;
        userCompanyMapping.updatedBy = json.updated_by;
        return userCompanyMapping;
    }

    static async validateUserCompany(userId, companyId) {
        const query = `select * from ${CompanyUserMapping.tableName} where company_id=${companyId} and user_id=${userId} limit 1`;
        const [result] = await db.query(query);
        return result.length > 0;
    }


}