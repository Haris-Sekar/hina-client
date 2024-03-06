import {createInsertQuery, createUpdateQuery} from "../config/query.js";
import db from "../config/db.js";

export default class Rate {
    sizeId;
    itemId;
    versionId;
    costPrice;
    sellingPrice;
    createdBy;
    createdTime;
    updatedBy;
    updatedTime;
    companyId;
    static tableName = "rate"
    constructor (sizeId, costPrice, sellingPrice) {
        this.sizeId = sizeId;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
    }

    static getParsedRateObject(rateArray, itemId, versionId) {
        let listOfParsedRateObject = [];
        rateArray.forEach(object => {
            try{
                const rateObject = new Rate(object.sizeId, object.costPrice, object.sellingPrice);
                rateObject.itemId = itemId;
                rateObject.versionId = versionId;
                listOfParsedRateObject.push(rateObject);
            } catch (e) {
                console.log("invalid rateObject");
            }
        });
        return listOfParsedRateObject;
    }

    static async pushRateObject(listOfRateObject, userId, companyId) {
        let resultInsertId = [];
        for(const rate of listOfRateObject) {
            const result = await rate.pushRate(userId, companyId)
            if(result.affectedRows > 0) {
                resultInsertId.push(result.insertId);
            }
        }
        return resultInsertId;
    }

    static async updateRateObject(listOfRateObject, userId, companyId) {
        let resultList = [];
        for(const rate of listOfRateObject) {
            const result = await rate.updateRate(userId, companyId);
            if(result.affectedRows > 0) {
                resultList.push(result.affectedRows)
            }
        }
        return resultList;
    }

    async pushRate (userId, companyId) {
        const query = createInsertQuery(Rate.tableName, this.serializeToSQLQuery(userId,companyId, false));
        const [result] = await db.query(query);
        return result;
    }

    async updateRate(userId, companyId) {
        const query = createUpdateQuery(Rate.tableName, this.serializeToSQLQuery(userId, companyId, true));
        const [result] = await db.query(query);
        return result;
    }



    serializeToSQLQuery(userId, companyId, isUpdate) {
        const currentMillis = Date.now();
        return {
            size_id: this.sizeId,
            item_id: this.itemId,
            rate_version_id: this.versionId,
            cost_price: this.costPrice,
            selling_price: this.sellingPrice,
            created_by: isUpdate ? this.createdBy : userId,
            created_time: isUpdate ? this.createdTime : currentMillis,
            updated_by: userId,
            updated_time: currentMillis,
            company_id: companyId
        };
    }
}