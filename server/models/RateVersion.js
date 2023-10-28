import {createInsertQuery, createUpdateQuery, generateUniqueId} from "../config/query.js";
import db from "../config/db.js";

export default class RateVersion{
    versionId;
    isDefault;
    createdBy;
    createdTime;
    updatedBy;
    updatedTime;
    companyId;
    static tableName = "rate_version";

    toJSON() {
        return {
            versionId: this.versionId,
            isDefault: this.isDefault,
            createdBy: this.createdBy,
            createdTime: new Date(this.createdTime).toLocaleString(),
            updatedBy: this.updatedBy,
            updatedTime: new Date(this.updatedTime).toLocaleString(),
            companyId: this.companyId
        }
    }

    static async deserializeFromJSON(json) {
        const rateVersion = new RateVersion();
        rateVersion.versionId = json.version_id;
        rateVersion.isDefault = json.is_default === 1;
        rateVersion.createdBy = json.created_by;
        rateVersion.createdTime = json.created_time;
        rateVersion.updatedBy = json.updated_by;
        rateVersion.updatedTime = json.updated_time;
        rateVersion.companyId = json.company_id;
    }

    async serializeToSQLQuery(userId, isUpdate) {
        const versionId = !isUpdate ? await generateUniqueId(RateVersion.tableName, "version_id") : this.versionId;
        const currentMillis = Date.now();
        const json = {
            version_id: versionId,
            is_default: this.isDefault === "true" ? 1 : 0,
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

    async addVersion(userId) {
        const query = createInsertQuery(RateVersion.tableName, await this.serializeToSQLQuery(userId, false));
        const [result] = await db.query(query);
        return result;
    }

    async updateVersion(userId) {
        const query = createUpdateQuery(RateVersion.tableName, await this.serializeToSQLQuery(userId, true),`version_id=${this.versionId}`);
        const [result] = await db.query(query);
        return result;
    }
}