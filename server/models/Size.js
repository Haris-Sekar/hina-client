import {
	createInsertQuery,
	createUpdateQuery,
	generateUniqueId,
	createDeleteQuery,
} from "../config/query.js";
import db from "../config/db.js";
import Users from "./Users.js";

export default class Size {
	sizeId;
	size;
	createdBy;
	createdTime;
	updatedBy;
	updatedTime;
	companyId;
	static tableName = "size";

	constructor(size) {
		this.size = size;
	}

	toJSON() {
		return {
			sizeId: this.sizeId,
			size: this.size,
			createdBy: this.createdBy,
			createdTime: new Date(this.createdTime).toLocaleString(),
			updatedBy: this.updatedBy,
			updatedTime: new Date(this.updatedTime).toLocaleString(),
			companyId: this.companyId,
		};
	}

	static async deserializeFromJSON(json) {
		const size = new Size(json.size);

		if (json.size_id !== null && json.size_id !== undefined) {
			size.sizeId = json.size_id;
		}

		let userDetails;

		if (json.created_by !== null && json.created_by === json.updated_by) {
			userDetails = await Users.getUserDetails(json.created_by);
			size.createdBy = userDetails;
			size.updatedBy = userDetails;
		} else {
			if (json.created_by !== null && json.created_by !== undefined) {
				size.createdBy = await Users.getUserDetails(json.created_by);
			}

			if (json.updated_by !== null && json.updated_by !== undefined) {
				size.updatedBy = await Users.getUserDetails(json.updated_by);
			}
		}

		if (json.created_time !== null && json.created_time !== undefined) {
			size.createdTime = json.created_time;
		}

		if (json.updated_time !== null && json.updated_time !== undefined) {
			size.updatedTime = json.updated_time;
		}

		if (json.company_id !== null && json.company_id !== undefined) {
			size.companyId = json.company_id;
		}

		return size;
	}

	async serializeToSQLQuery(userId, isUpdate) {
		const sizeId = !isUpdate
			? await generateUniqueId(Size.tableName, "size_id")
			: this.sizeId;
		const currentMillis = Date.now();
		const json = {
			size_id: sizeId,
			size: this.size,
			created_by: !isUpdate ? userId : this.createdBy,
			updated_by: userId,
			created_time: !isUpdate ? currentMillis : this.createdTime,
			updated_time: currentMillis,
			company_id: this.companyId,
		};
		for (const key in json) {
			if (json[key] === undefined) {
				delete json[key];
			}
		}
		return json;
	}

	async addSize(userId) {
		const query = createInsertQuery(
			Size.tableName,
			await this.serializeToSQLQuery(userId, false)
		);
		const [result] = await db.query(query);
		return result;
	}

	async updateSize(userId) {
		const query = createUpdateQuery(
			Size.tableName,
			await this.serializeToSQLQuery(userId, true),
			`size_id=${this.sizeId}`
		);
		const [result] = await db.query(query);
		return result;
	}

	static async getSizes(companyId) {
		const query = `select * from size where company_id= ${companyId}`;
		const [result] = await db.query(query);

		let listOfSizes = [];

		result.forEach((size) => {
			listOfSizes.push(Size.deserializeFromJSON(size));
		});

		await Promise.all(listOfSizes).then((result) => {
			listOfSizes = result;
		});

		return listOfSizes;
	}

	static async getSize(companyId, sizeId) {
		const query = `select * from size where size_id = ${sizeId} and company_id= ${companyId} limit 0,1`;
		const [result] = await db.query(query);

		if (result.length === 1) {
			return Size.deserializeFromJSON(result[0]);
		}
		return null;
	}

	async deleteSize(sizeId) {
		const query = createDeleteQuery(Size.tableName, sizeId, "size_id");
		const [result] = await db.query(query);
		return result;
	}
}
