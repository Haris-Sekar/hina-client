import Customer from "../models/Customer.js";
import db from "../config/db.js";

export const addCustomer = async (req, res) => {
    let response = {};
    let respCode = 0;
    addCustomerTry: try{
        await db.beginTransaction();
        const { firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId } = req.body;

        const requiredFields = ['firstName', 'phoneNumber', 'mainAreaId', 'address1'];
        const missingFields = [];

        for (const field of requiredFields) {
            if (!eval(field)) {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            respCode = 400;
            response = {
                fields: missingFields,
                message: "The above fields validation failed"
            };
            break addCustomerTry;
        }

        const customer = new Customer(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId);

        const result = await customer.createCustomer(req.userId);

        if(result.affectedRows > 0 ){
            response = {
                message: "Customer created successfully",
                code: 201,
                customer: await customer.getCustomerDetails()
            }
            respCode = 201;
        }
        await db.commit();
    } catch (e) {
        await db.rollback();
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }

    res.status(respCode).json(response);

}

export const getCustomers = async (req, res) => {

}