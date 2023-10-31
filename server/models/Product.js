import {createInsertQuery, createUpdateQuery, generateUniqueId} from "../config/query.js";
import db from "../config/db.js";

export default class Product {
    itemId;
    itemName;
    hsnCode;
    itemGroupId;
    createdBy;
    createdTime;
    updatedBy;
    updatedTime;
    companyId;
    static tableName = "products";

    constructor(itemName, hsnCode, itemGroupId) {
        this.itemName = itemName;
        this.hsnCode = hsnCode;
        this.itemGroupId = itemGroupId;
    }

    toJSON() {}

    async serializeToSQLQuery(userId, isUpdate) {
        const itemId = isUpdate ? this.itemId : await generateUniqueId(Product.tableName, "item_id");
        const currentMillis = Date.now();
        const json = {
            item_id: !isUpdate ? itemId : undefined,
            item_name: this.itemName,
            hsn_code: this.hsnCode,
            item_group_id: this.itemGroupId,
            created_by: isUpdate ? this.createdBy : userId,
            created_time: isUpdate ? this.createdTime : currentMillis,
            updated_by: userId,
            updated_time: currentMillis,
            company_id: this.companyId
        };
        for(const key in json) {
           if(json[key] === undefined) delete json[key];
        }
        return json;
    }


    async createProduct(userId) {
        const query = createInsertQuery(Product.tableName, await this.serializeToSQLQuery(userId, false))

        const [result] = await db.query(query);

        return result;
    }

    async updateProduct(userId){
        const query = createUpdateQuery(Product.tableName, await this.serializeToSQLQuery(userId, true), `item_id = ${this.itemId}`);
        const [result] = await db.query(query);
        return result;
    }
}
