import {createCountQuery, createInsertQuery, createUpdateQuery, generateUniqueId} from "../config/query.js";
import db from "../config/db.js";
import Users from "./Users.js";

export default class MainArea {
    mainAreaId;
    name;
    createdBy;
    createdTime;
    updatedBy;
    updatedTime;
    companyId;
    static tableName = "main_area";

    constructor(name, companyId) {
        this.name = name;
        this.companyId = companyId;
    }


    async serializeToSQLQuery(userId) {
        const mainAreaId = await generateUniqueId(MainArea.tableName, "main_area_id");
        const json = {
            main_area_id: mainAreaId,
            name: this.name,
            created_by: userId,
            created_time: Date.now(),
            updated_by: userId,
            updated_time: Date.now(),
            company_id: this.companyId
        };
        for (const key in json) {
            if (json[key] === undefined) {
                delete json[key];
            }
        }
        return json;
    }

    static async deserializeFromJson(json) {

        const mainArea = new MainArea();

        if(json.name !== null && json.name !== undefined) {
            mainArea.name = json.name;
        }

        let userDetails;

        if(json.created_by === json.updated_by) {
            userDetails = await Users.getUserDetails(json.created_by);
            mainArea.updatedBy = userDetails;
            mainArea.createdBy = userDetails;
        } else if(json.created_by !== null && json.created_by !== undefined) {
            mainArea.createdBy = await Users.getUserDetails(json.created_by);
        } else if(json.updated_by !== null && json.updated_by !== undefined) {
            mainArea.updatedBy = await Users.getUserDetails(json.updated_by);
        }

        if(json.created_time !== null && json.created_time !== undefined) {
            mainArea.createdTime = json.created_time;
        }

        if(json.updated_time !== null && json.updated_time !== undefined) {
            mainArea.updatedTime = json.updated_time;
        }

        if(json.main_area_id !== null && json.main_area_id !== undefined) {
            mainArea.mainAreaId = json.main_area_id;
        }

        if(json.company_id !== null && json.company_id !== undefined) {
            mainArea.companyId = json.company_id;
        }

        return mainArea;

    }

    async addMainArea(userId) {
        const query = createInsertQuery("main_area", await this.serializeToSQLQuery(userId));

        const [result] = await db.query(query);

        return result;

    }

    static async updateMainArea(updateObj, condition) {
        const query = createUpdateQuery("main_area", updateObj, condition);

        const [result] = await db.query(query);

        return result;
    }

    static async getMainAreas(companyId, index = 0, range = 10) {
        const query = `select * from main_area where company_id= ${companyId} limit ${index}, ${range}`;
        const [result] = await db.query(query);
        
        let listOfMainArea = [];
        
        result.forEach((mainArea) => {
            listOfMainArea.push(MainArea.deserializeFromJson(mainArea));
        });

        await Promise.all(listOfMainArea).then((result) => {
            listOfMainArea=result;
        });

        return listOfMainArea;
    }

    static async getMainAreaCount(companyId) {
        const query = createCountQuery("main_area", `company_id= ${companyId}`);
        
        const [result] = await db.query(query);
        
        return result[0];
    }

    static async getMainArea(companyId, mainAreaId) {
        const query = `select * from main_area where main_area_id = ${mainAreaId} and company_id= ${companyId} limit 0,1`;
        const [result] = await db.query(query);

        if(result.length === 1) {
            return MainArea.deserializeFromJson(result[0])
        }
        return null;
    }


}