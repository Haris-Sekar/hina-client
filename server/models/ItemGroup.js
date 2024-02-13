import {
	createInsertQuery,
	createUpdateQuery,
	generateUniqueId,
	createDeleteQuery,
} from "../config/query.js";
import db from "../config/db.js";
import Users from "./Users.js";

export default class ItemGroup {
	groupId;
	name;
	createdBy;
	createdTime;
	updatedBy;
	updatedTime;
	companyId;
	static tableName = "item_group";

	constructor(name) {
		this.name = name;
	}

	toJSON() {
		return {
			groupId: this.groupId,
			name: this.name,
			createdBy: this.createdBy,
			createdTime: new Date(this.createdTime).toLocaleString(),
			updatedBy: this.updatedBy,
			updatedTime: new Date(this.updatedTime).toLocaleString(),
			companyId: this.companyId,
		};
	}

	static async deserializeFromJSON(json) {
		const itemGroup = new ItemGroup(json.name);

		if (json.group_id !== null && json.group_id !== undefined) {
			itemGroup.groupId = json.group_id;
		}

		let userDetails;

		if (json.created_by !== null && json.created_by === json.updated_by) {
			userDetails = await Users.getUserDetails(json.created_by);
			itemGroup.createdBy = userDetails;
			itemGroup.updatedBy = userDetails;
		} else {
			if (json.created_by !== null && json.created_by !== undefined) {
				itemGroup.createdBy = await Users.getUserDetails(json.created_by);
			}

			if (json.updated_by !== null && json.updated_by !== undefined) {
				itemGroup.updatedBy = await Users.getUserDetails(json.updated_by);
			}
		}

		if (json.created_time !== null && json.created_time !== undefined) {
			itemGroup.createdTime = json.created_time;
		}

		if (json.updated_time !== null && json.updated_time !== undefined) {
			itemGroup.updatedTime = json.updated_time;
		}

		if (json.company_id !== null && json.company_id !== undefined) {
			itemGroup.companyId = json.company_id;
		}

		return itemGroup;
	}

	async serializeToSQLQuery(userId, isUpdate) {
		const groupId = !isUpdate
			? await generateUniqueId(ItemGroup.tableName, "group_id")
			: this.groupId;
		const currentMillis = Date.now();
		const json = {
			group_id: groupId,
			name: this.name,
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

	async addGroup(userId) {
		const query = createInsertQuery(
			ItemGroup.tableName,
			await this.serializeToSQLQuery(userId, false)
		);
		const [result] = await db.query(query);
		return result;
	}

	async updateGroup(userId) {
		const query = createUpdateQuery(
			ItemGroup.tableName,
			await this.serializeToSQLQuery(userId, true),
			`group_id=${this.groupId}`
		);
		const [result] = await db.query(query);
		return result;
	}

	static async getItemGroups(companyId) {
		const query = `select * from item_group where company_id= ${companyId}`;
		const [result] = await db.query(query);

		let listOfItemGroups = [];

		result.forEach((itemGroup) => {
			listOfItemGroups.push(ItemGroup.deserializeFromJSON(itemGroup));
		});

		await Promise.all(listOfItemGroups).then((result) => {
			listOfItemGroups = result;
		});

		return listOfItemGroups;
	}

	static async getItemGroup(companyId, itemGroupId) {
		const query = `select * from item_group where group_id = ${itemGroupId} and company_id= ${companyId} limit 0,1`;
		const [result] = await db.query(query);

		if (result.length === 1) {
			return ItemGroup.deserializeFromJSON(result[0]);
		}
		return null;
	}

	async deleteItemGroup(groupId) {
		const query = createDeleteQuery(ItemGroup.tableName, groupId, "group_id");
		const [result] = await db.query(query);
		return result;
	}
}
