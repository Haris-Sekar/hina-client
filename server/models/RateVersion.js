import {createInsertQuery, createUpdateQuery, generateUniqueId, createDeleteQuery} from "../config/query.js";
import db from "../config/db.js";
import Users from "./Users.js";

export default class RateVersion{
    versionId;
    name;
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
            name: this.name,
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

        if(json.version_id !== null && json.version_id !== undefined){
            rateVersion.versionId = json.version_id;
        }
        if(json.name !== null && json.name !== undefined){
            rateVersion.name = json.name;
        }

        if(json.is_default !== null && json.is_default !== undefined){
            rateVersion.isDefault = json.is_default === 1;
        }

        let userDetails;

        if(json.created_by !== null && json.created_by === json.updated_by) {
            userDetails = await Users.getUserDetails(json.created_by);
            rateVersion.createdBy = userDetails;
            rateVersion.updatedBy = userDetails;
        } else {
            if(json.created_by !== null && json.created_by !== undefined) {
                rateVersion.createdBy = await Users.getUserDetails(json.created_by);
            } 
            
            if(json.updated_by !== null && json.updated_by !== undefined) {
                rateVersion.updatedBy = await Users.getUserDetails(json.updated_by);
            }
        }
           
        if(json.created_time !== null && json.created_time !== undefined) {
            rateVersion.createdTime = json.created_time;
        }

        if(json.updated_time !== null && json.updated_time !== undefined) {
            rateVersion.updatedTime = json.updated_time;
        }
        
        if(json.company_id !== null && json.company_id !== undefined) {
            rateVersion.companyId = json.company_id;
        }

        return rateVersion;
    }

    async serializeToSQLQuery(userId, isUpdate) {
        const versionId = !isUpdate ? await generateUniqueId(RateVersion.tableName, "version_id") : this.versionId;
        const currentMillis = Date.now();
        const json = {
            version_id: versionId,
            name: this.name,
            is_default: this.isDefault === true ? 1 : 0,
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

    static async getVersions(companyId) {
        const query = `select * from rate_version where company_id= ${companyId} order by is_default desc`;
        const [result] = await db.query(query);
        
        let listOfVersions = [];
        
        result.forEach((version) => {
            listOfVersions.push(RateVersion.deserializeFromJSON(version));
        });

        await Promise.all(listOfVersions).then((result) => {
            listOfVersions = result;
        });

        return listOfVersions;
    }

    static async getVersion(companyId, versionId) {
        const query = `select * from rate_version where version_id = ${versionId} and company_id= ${companyId} limit 0,1`;
        const [result] = await db.query(query);

        if(result.length === 1) {
            return RateVersion.deserializeFromJSON(result[0]);
        }
        return null;
    }

    async deleteVersion(versionId) {
        const query = createDeleteQuery(RateVersion.tableName, versionId, "version_id");
        const [result] = await db.query(query);
        return result;
    } 
}