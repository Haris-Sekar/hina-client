import db from "../config/db.js";
import { createInsertQuery, createUpdateQuery } from "../config/query.js";
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

    constructor(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.gstNumber = gstNumber;
        this.address1 = address1;
        this.address2 = address2;
        this.mainAreaId = mainAreaId;
    }


  toJSON() {
    const jsonObject = {
       firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        gstNumber: this.gstNumber,
        address1: this.address1,
        address2: this.address2,
        mainAreaId: this.mainAreaId
    };

    if (this.customerId !== undefined) {
      jsonObject.customerId = this.customerId;
    }

    return jsonObject;
  }

  static fromJSON(json) {
    const { firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId } = json;

    return new Customer(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId);
  }


    static deserializeFromJson(json) {
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
            customer.mainAreaId = json.main_area_id;
        }

        return customer;
    }


  async getCustomerDetails(index = 0, range = 1) {
    const query = `select * from customers limit ${index}, ${range}`;

    const [result] = await db.query(query);

    if (result.length === 1) {
      return Customer.deserializeFromJson(result[0]);
    } else if(result.length > 1) {
      let listOfCustomer = [];
      result.forEach(customer => {
          listOfCustomer.push(Customer.deserializeFromJson(customer));
      })
      return listOfCustomer;
    }
  }

  async createCustomer(userId) {
    const query = createInsertQuery("customers", this.serializeToSQLQuery(userId));

    const [result] = await db.query(query);

    return result;
  }

  async updateCustomer(updateObj, condition) {
    const query = createUpdateQuery("customers", updateObj, condition);

    const [result] = await db.query(query);

    return result;
  }



    serializeToSQLQuery(userId) {
        const json = {
            first_name: this.firstName,
            last_name: this.lastName,
            phone_number: this.phoneNumber,
            email: this.email,
            gst_number: this.gstNumber,
            address1: this.address1,
            address2: this.address2,
            main_area_id: this.mainAreaId,
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



}
