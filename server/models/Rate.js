import { createInsertQuery, createUpdateQuery } from "../config/query.js";
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
	static tableName = "rate";
	constructor(sizeId, costPrice, sellingPrice) {
		this.sizeId = sizeId;
		this.costPrice = costPrice;
		this.sellingPrice = sellingPrice;
	}

	static getParsedRateObject(rateArray, itemId, versionId) {
		let listOfParsedRateObject = [];
		rateArray.forEach((object) => {
			try {
				const rateObject = new Rate(
					object.sizeId,
					object.costPrice,
					object.sellingPrice
				);
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
		for (const rate of listOfRateObject) {
			const result = await rate.pushRate(userId, companyId);
			if (result.affectedRows > 0) {
				resultInsertId.push(result.insertId);
			}
		}
		return resultInsertId;
	}

	static async updateRateObject(listOfRateObject, userId, companyId) {
		let resultList = [];
		for (const rate of listOfRateObject) {
			const isRateAvailable = await rate.isRateAvailable(userId, companyId);

			if (isRateAvailable) {
				const result = await rate.updateRate(userId, companyId);
				if (result.affectedRows > 0) {
					resultList.push(result.affectedRows);
				}
			} else {
				const result = await rate.pushRate(userId, companyId);
				if (result.affectedRows > 0) {
					resultList.push(result.affectedRows);
				}
			}
		}
		return resultList;
	}

	async pushRate(userId, companyId) {
		const query = createInsertQuery(
			Rate.tableName,
			this.serializeToSQLQuery(userId, companyId, false)
		);
		const [result] = await db.query(query);
		return result;
	}

	async updateRate(userId, companyId) {
		const query = createUpdateQuery(
			Rate.tableName,
			this.serializeToSQLQuery(userId, companyId, true)
		);
		const [result] = await db.query(query);
		return result;
	}

	async isRateAvailable(userId, companyId) {
		const query = `select * from rate where rate_version_id = ${this.versionId} and item_id = ${this.itemId} and size_id = ${this.sizeId}`;
		const [result] = await db.query(query);
		console.log("result ", result);
		return result.length > 0;
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
			company_id: companyId,
		};
	}

	static async fetchProductWithRate(companyId, productId,  index, range) {
		const query = `select
						products.item_id as itemId,
						products.item_name as itemName,
						products.hsn_code as hsnCode,
						item_group.name as item_group,
						products.created_by as createdBy,
						products.created_time as createdTime,
						products.updated_by as updatedBy,
						products.updated_time as updatedTime,
						size.size_id as sizeId,
						size.size as size,
						size.created_by as sizeCreatedBy,
						size.created_time as sizeCreatedTime,
						size.updated_by as sizeUpdatedBy,
						size.updated_time as sizeUpdatedTime,
						rate.rate_version_id as versionId,
						rate.cost_price as costPrice,
						rate.selling_price as sellingPrice,
						rate.created_by as rateCreatedBy,
						rate.created_time as rateCreatedTime,
						rate.updated_by as rateUpdatedBy,
						rate.updated_time as rateUpdatedTime,
						rate_version.name as rateVersionName,
						rate_version.is_default as rateVersionIsDefault,
						rate_version.created_by as rateVersionCreatedBy,
						rate_version.created_time as rateVersionCreatedTime,
						rate_version.updated_by as rateVersionUpdatedBy,
						rate_version.updated_time as rateVersionUpdatedTime,
						rate_version.company_id as companyId
					from
						products
						join item_group on products.item_group_id = item_group.group_id
						join rate on products.item_id = rate.item_id
						join rate_version on rate.rate_version_id = rate_version.version_id
						join size on size.size_id = rate.size_id
					where
						${productId === -1 ? '' : `rate.item_id = ${productId} and`}
						products.company_id = ${companyId}
					order by rate.rate_version_id limit ${index}, ${range}`;
		const [result] = await db.query(query);
		return result;
	}
}
