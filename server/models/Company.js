import {
	createInsertQuery,
	createUpdateQuery,
	generateUniqueId,
} from "../config/query.js";
import db from "../config/db.js";
import CompanyUserMapping from "./CompanyUserMapping.js";
import Users from "./Users.js";

export default class Company {
	companyId;
	name;
	gst;
	address;
	createdTime;
	static tableName = "company";

	constructor(name, gst, address) {
		this.name = name;
		this.gst = gst;
		this.address = address;
	}

	async createCompany(userId) {
		const query = createInsertQuery(
			"company",
			await this.serializeToSQLQuery(userId)
		);

		const [result] = await db.query(query);

		return result;
	}

	static async getCompanyDetails(companyId) {
		const query = `select * from company where company_id=${companyId} limit 0,1`;

		const [result] = await db.query(query);

		if (result.length === 1) {
			return await Company.deserializeFromJson(result[0]);
		}
		return null;
	}

	static async getUserCompanies(userId) {
		const query = `select company.* from company join ${CompanyUserMapping.tableName} on ${CompanyUserMapping.tableName}.company_id = company.company_id where ${CompanyUserMapping.tableName}.user_id=${userId}`;
		const [result] = await db.query(query);

		if (result.length === 1) {
			return [await Company.deserializeFromJson(result[0])];
		} else if (result.length > 1) {
			let listOfCompany = [];

			for (const i in result) {
				listOfCompany.push(await Company.deserializeFromJson(result[i]));
			}

			return listOfCompany;
		}
	}
	static async updateCompany(updateObj, condition) {
		const query = createUpdateQuery("company", updateObj, condition);

		const [result] = await db.query(query);

		return result;
	}

	async serializeToSQLQuery(userId) {
		let companyId = await generateUniqueId(Company.tableName, "company_id");
		const json = {
			company_id: companyId,
			name: this.name,
			gst: this.gst,
			address: this.address,
			created_time: Date.now(),
			created_by: userId,
			owner_id: userId,
		};
		for (const key in json) {
			if (json[key] === undefined) {
				delete json[key];
			}
		}
		return json;
	}
	static async deserializeFromJson(json) {
		const company = new Company(json.name, json.gst, json.address);
		company.companyId = json.company_id;
		company.createdTime = json.created_time;
		company.createdBy = json.created_by;
		company.ownerId = json.owner_id;
		return company.toJSON();
	}

	async generateUniqueCompanyId() {
		const existingCompanyIds = await this.getAllCompanyIds(); // Implement this function to fetch existing company IDs from the database

		let companyId;
		do {
			companyId = Math.floor(1000000 + Math.random() * 9000000); // Generate a random 7-digit number
		} while (existingCompanyIds.includes(companyId)); // Check if the ID is unique

		return companyId;
	}

	async getAllCompanyIds() {
		const query = `select company_id from company`;
		const [result] = await db.query(query);
		return result;
	}

	async toJSON() {
		return {
			companyId: this.companyId,
			name: this.name,
			address: this.address,
			gst: this.gst,
			ownerDetails: await Users.getUserDetails(this.ownerId),
			createdTime: this.createdTime,
			createdBy: await Users.getUserDetails(this.createdBy),
		};
	}
}
