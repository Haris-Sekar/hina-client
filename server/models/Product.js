import {
	createInsertQuery,
	createUpdateQuery,
	generateUniqueId,
} from "../config/query.js";
import db from "../config/db.js";
import Users from "./Users.js";

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

	async serializeToSQLQuery(userId, isUpdate) {
		const itemId = isUpdate
			? this.itemId
			: await generateUniqueId(Product.tableName, "item_id");
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
			company_id: this.companyId,
		};
		for (const key in json) {
			if (json[key] === undefined) delete json[key];
		}
		return json;
	}

	static async deserializeFromSQLQuery(result, userId) {
		const product = new Product(
			result?.item_name,
			result?.hsnCode,
			result?.item_group_id
		);
		product.companyId = result?.company_id;
		product.createdBy = await Users.getUserDetails(result?.created_by);
		product.updatedBy = await Users.getUserDetails(result?.updated_by);
		product.createdTime = result?.created_time;
		product.updatedTime = result?.updated_time;
		return product;
	}

	async createProduct(userId) {
		const query = createInsertQuery(
			Product.tableName,
			await this.serializeToSQLQuery(userId, false)
		);

		const [result] = await db.query(query);

		return result;
	}

	static async getProducts(companyId, index, range) {
		const query = `select * from products where company_id= ${companyId} order by created_time ${
			index && range ? `limit ${index}, ${range}` : ""
		}`;
		const [result] = await db.query(query);

		let listOfProduct = [];

		result.forEach((product) => {
			listOfProduct.push(Product.deserializeFromSQLQuery(product));
		});

		await Promise.all(listOfProduct).then((result) => {
			listOfProduct = result;
		});

		return listOfProduct;
	}

	static async getProduct(itemId) {
		const query = `select * from product where item_id=${itemId}`;

		const [result] = await db.query(query);

		return result;
	}

	async updateProduct(userId) {
		const query = createUpdateQuery(
			Product.tableName,
			await this.serializeToSQLQuery(userId, true),
			`item_id = ${this.itemId}`
		);
		const [result] = await db.query(query);
		return result;
	}
}
