import db from "../config/db.js";
import {createInsertQuery, createUpdateQuery, generateUniqueId} from "../config/query.js";
import customer from "../routers/customer.js";
import Users from "./Users.js";
import MainArea from "./MainArea.js";
import {getMainArea} from "../controllers/customer.js";
export default class Customer {
  customerId;
  firstName;
  lastName;
  phoneNumber;
  email;
  gstNumber;
  address1;
  address2;
  mainAreaId;
  createdTime;
  updatedTime;
  createdBy;
  updatedBy;
  mainArea;
  companyId;
  static tableName = "customers";

  constructor(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId, companyId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.gstNumber = gstNumber;
    this.address1 = address1;
    this.address2 = address2;
    this.mainAreaId = mainAreaId;
    this.companyId = companyId;
  }


  toJSON() {
    const jsonObject = {
      customerId: this.customerId,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      gstNumber: this.gstNumber,
      address1: this.address1,
      address2: this.address2,
      mainAreaId: this.mainAreaId,
      mainArea: this.mainArea,
      createdBy: this.createdBy,
      createdTime: new Date(this.createdTime).toLocaleString(),
      updatedBy: this.updatedBy,
      updatedTime: new Date(this.updatedTime).toLocaleString(),
      companyId: this.companyId
    };

    if (this.customerId !== undefined) {
      jsonObject.customerId = this.customerId;
    }

    return jsonObject;
  }

  static fromJSON(json) {
    const { firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId, companyId } = json;

    return new Customer(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId,companyId);
  }


  static async deserializeFromJson(json) {
    const customer = new Customer();

    if (json.customer_id !== null && json.customer_id !== undefined) {
      customer.customerId = json.customer_id;
    }

    if (json.first_name !== null && json.first_name !== undefined) {
      customer.firstName = json.first_name;
    }

    if (json.last_name !== null && json.last_name !== undefined) {
      customer.lastName = json.last_name;
    }

    if (json.phone_number !== null && json.phone_number !== undefined) {
      customer.phoneNumber = json.phone_number;
    }

    if (json.email !== null && json.email !== undefined) {
      customer.email = json.email;
    }

    if (json.gst_number !== null && json.gst_number !== undefined) {
      customer.gstNumber = json.gst_number;
    }

    if (json.address1 !== null && json.address1 !== undefined) {
      customer.address1 = json.address1;
    }

    if (json.address2 !== null && json.address2 !== undefined) {
      customer.address2 = json.address2;
    }

    if (json.main_area_id !== null && json.main_area_id !== undefined) {
       const mainArea = await MainArea.getMainArea(json.main_area_id);
      customer.mainArea = { name: mainArea.name, mainAreaId: json.main_area_id }
    }
    if(json.company_id !== null && json.company_id !== undefined) {
      customer.companyId = json.company_id;
    }

    let userDetails;

    if(json.created_by === json.updated_by) {
      userDetails = await Users.getUserDetails(json.created_by);
      customer.updatedBy = userDetails;
      customer.createdBy = userDetails;
    } else if(json.created_by !== null && json.created_by !== undefined) {
      customer.createdBy = await Users.getUserDetails(json.created_by);
    } else if(json.updated_by !== null && json.updated_by !== undefined) {
      customer.updatedBy = await Users.getUserDetails(json.updated_by);
    }

    if(json.created_time !== null && json.created_time !== undefined) {
      customer.createdTime = json.created_time;
    }

    if(json.updated_time !== null && json.updated_time !== undefined) {
      customer.updatedTime = json.updated_time;
    }

    return customer;
  }


  static async getCustomers(index = 0, range = 1) {
    const query = `select * from customers limit ${index}, ${range}`;

    const [result] = await db.query(query);

    if (result.length === 1) {
      return await Customer.deserializeFromJson(result[0]);
    } else if (result.length > 1) {
      let listOfCustomer = [];

      for(const i in result) {
        listOfCustomer.push(await Customer.deserializeFromJson(result[i]));
      }

      return listOfCustomer;
    }
  }

  async createCustomer(userId) {
    const query = createInsertQuery("customers",await this.serializeToSQLQuery(userId, false));

    const [result] = await db.query(query);

    return result;
  }

  static async updateCustomer(updateObj, condition) {
    const query = createUpdateQuery("customers", updateObj, condition);

    const [result] = await db.query(query);

    return result;
  }



  async serializeToSQLQuery(userId, isUpdate) {
    const customerId = await generateUniqueId(Customer.tableName, "customer_id");
    const json = {
      customer_id: customerId,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      email: this.email,
      gst_number: this.gstNumber,
      address1: this.address1,
      address2: this.address2,
      main_area_id: this.mainAreaId,
      created_by: !isUpdate ? userId: undefined,
      created_time:!isUpdate ? Date.now(): undefined,
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

  static async getCustomerDetails(customerId) {
    const query = `select * from customers where customer_id=${customerId} limit 0,1;`;
    const [result] = await db.query(query);
    if (result.length === 1) {
      return await Customer.deserializeFromJson(result[0]);
    }
    return null;
  }

  async updateCustomer(userId) {
    const query = createUpdateQuery("customers", this.serializeToSQLQuery(userId, true) , `customer_id = ${this.customerId}`);
    const [result] = await db.query(query);
    return result;
  }

}
