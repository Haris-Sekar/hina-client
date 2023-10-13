import {createInsertQuery, createUpdateQuery} from "../config/query.js";
import db from "../config/db.js";
import Users from "./Users.js";

export default class MainArea {
    mainAreaId;
    name;
    createdBy;
    createdTime;
    updatedBy;
    updatedTime;
    static tableName = "main_area";

    constructor(name) {
        this.name = name;
    }


    serializeToSQLQuery(userId) {
        const json = {
            name: this.name,
            created_by: userId,
            created_time: Date.now(),
            updated_by: userId,
            updated_time: Date.now()
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

        return mainArea;

    }

    async addMainArea(userId) {
        const query = createInsertQuery("main_area", this.serializeToSQLQuery(userId));

        const [result] = await db.query(query);

        return result;

    }

    static async updateMainArea(updateObj, condition) {
        const query = createUpdateQuery("main_area", updateObj, condition);

        const [result] = await db.query(query);

        return result;
    }

    static async getMainAreas(index = 0, range = 1) {
        const query = `select * from main_area limit ${index}, ${range}`;

        const [result] = await db.query(query);

        if (result.length === 1) {
            return MainArea.deserializeFromJson(result[0]);
        } else if (result.length > 1) {
            let listOfMainArea = [];
            result.forEach(mainArea => {
                listOfMainArea.push(MainArea.deserializeFromJson(mainArea));
            })
            return listOfMainArea;
        }
    }

    static async getMainArea(mainAreaId) {
        const query = `select * from main_area where main_area_id = ${mainAreaId} limit 0,1`;
        const [result] = await db.query(query);

        if(result.length === 1) {
            return MainArea.deserializeFromJson(result[0])
        }
        return null;
    }


}