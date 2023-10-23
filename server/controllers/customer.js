import Customer from "../models/Customer.js";
import db from "../config/db.js";
import MainArea from "../models/MainArea.js";
import {createDeleteQuery} from "../config/query.js";

export const addCustomer = async (req, res) => {
    let response = {};
    let respCode = 0;
    addCustomerTry: try{
        await db.beginTransaction();
        const { firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId } = req.body;
        const { companyId } = req.params;
        
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

        const customer = new Customer(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId, companyId);

        const result = await customer.createCustomer(req.userId);

        if(result.affectedRows > 0 ){
            await db.commit();
            response = {
                message: "Customer created successfully",
                code: 201,
                customer: await Customer.getCustomerDetails(result.insertId)
            }
            respCode = 201;
        }

    } catch (e) {
        await db.rollback();
        if(e.code === "ER_NO_REFERENCED_ROW_2") {
            response = {
                message: "There is no Main Area with the provided ID",
                code: 500
            }
        } else {
            response = {
                message: e.message,
                code: 500
            }
        }
        respCode = 500;
    }

    res.status(respCode).json(response);

}

export const getCustomers = async (req, res) => {
    let respCode, response;

    try{

        const { customerId, index, range } = req.query;
        const { companyId } = req.params;

        if(customerId != null) {
            const customerDetails = await Customer.getCustomerDetails(companyId, customerId);
            respCode = 200;
            response = customerDetails;
        } else if(index && range) {
            const customerDetails = await Customer.getCustomers(companyId, index, range);
            respCode = 200;
            response = {
                "index": index,
                "range": range,
                "resultCount": customerDetails.length,
                "result": customerDetails
            };
        } else {
            respCode = 403;
            response = {
                message: "Field validation error",
                fields: "customerId or index and range should be provided"
            }
        }


    } catch (e) {
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }
    res.status(respCode).json(response)
}

export const getCustomersCount = async (req, res) => {
    let respCode, response;

    try{
        const { companyId } = req.params;
        const countResult = await Customer.getCustomersCount(companyId);
        respCode = 200;
        response = { customerCount : countResult.count};
    } catch (e) {
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }
    res.status(respCode).json(response);
}


export const updateCustomer = async (req, res) => {
    let respCode, response;
    updateCustomerTry: try {
        await db.beginTransaction();
        const { firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId } = req.body;
        const { customerId, companyId } = req.params;

        let breakFlag = 0;

        if(!customerId) {
                response = {
                    fields: ["customerId"],
                    "message": "The above fields validation failed"
                }
                respCode = 400;
                breakFlag = 1;
        }
        if(!(firstName || lastName || phoneNumber || email || gstNumber || address1 || address2 || mainAreaId)){
            response.fields = ["firstName", "lastName", "phoneNumber", "email", "gstNumber", "address1", "address2", "mainAreaId"];
            response.message = "customerId and the above mentioned params should be present";
            respCode = 400;
            breakFlag = 1;
        }

        if (breakFlag === 1) break updateCustomerTry;

        const customer = new Customer(firstName, lastName, phoneNumber, email, gstNumber, address1, address2, mainAreaId, companyId);

        customer.customerId = customerId;

        const result = await customer.updateCustomer(req.userId);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 200;
            response = {
                message: "Customer updated successfully",
                code: 200
            }
        }


    } catch (e) {
        await db.rollback();
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }
    res.status(respCode).json(response)
}

export const deleteCustomer = async (req, res) => {
    let respCode, response;
    deleteCustomerTry: try{
        await db.beginTransaction();
        const {customerId} = req.params;

        if(!customerId) {
            respCode = 403;
            response = {
                message: "Field validation error",
                fields: "customerId should be provided"
            }
            break deleteCustomerTry;
        }
        const query = createDeleteQuery(Customer.tableName, customerId, "customer_id");

        const [result] = await db.query(query);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 204;
            response = {};
        } else {
            await db.commit();
            respCode = 404;
            response = {
                message: "No Customer with that ID is available",
                code: 404
            };
        }

    } catch(e) {
        await db.rollback();
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }

    res.status(respCode).json(response)

}

export const addMainArea = async (req, res) => {

    let respCode, response;

    addMainAreaTry: try{
        await db.beginTransaction();
        const {name} = req.body;

        if(!name) {
            respCode = 400;
            response = {
                fields: "name",
                message: "The above fields validation failed"
            };
            break addMainAreaTry;
        }

        const mainArea = new MainArea(name, req.companyId);
        const result = await mainArea.addMainArea(req.userId);

        if(result.affectedRows > 0 ){
            await db.commit();
            response = {
                message: "Main Area added successfully",
                code: 201,
                mainArea: await MainArea.getMainArea(result.insertId)
            }
            respCode = 201;
        }
    } catch (e) {

        if(e.code === "ER_DUP_ENTRY") {
            response = {
                message: `Main area with the name ${req.body.name} is already exist`,
                code: 500
            }
        } else {
            response = {
                message: e.message,
                code: 500
            }
        }
        respCode = 500;
    }
    res.status(respCode).json(response)
}

export const getMainArea = async (req, res) => {
    let respCode, response;

    try{
        const { mainAreaId, index, range } = req.query;
        const { companyId } = req.params;

        if(mainAreaId != null) {
            const areaDetails = await MainArea.getMainArea(companyId, mainAreaId)
            respCode = 200;
            response = {
                "index": index,
                "range": range,
                "resultCount": areaDetails.length,
                "result": areaDetails
            };;
        } else if(index && range) {
            const areaDetails = await MainArea.getMainAreas(companyId, index , range);
            respCode = 200;
            response = areaDetails;
        } else {
            respCode = 403;
            response = {
                message: "Field validation error",
                fields: "mainAreaId or index and range should be provided"
            }
        }

    } catch (e) {
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }
    res.status(respCode).json(response);
}

export const getMainAreaCount = async (req, res) => {
    let respCode, response;

    try{
        const { companyId } = req.params;
        const countResult = await MainArea.getMainAreaCount(companyId)
        respCode = 200;
        response = { areaCount : countResult.count};
    } catch (e) {
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }
    res.status(respCode).json(response);
}

export const updateMainArea = async (req, res) => {
    let respCode, response;

    updateMainAreaTry: try{
        const {mainAreaId} = req.params;
        const {name} = req.body;

        if(!mainAreaId || !name) {
            respCode = 403;
            response = {
                message: "Field validation error",
                fields: "mainAreaId and name should be provided"
            }
            break updateMainAreaTry;
        }

        const result = await MainArea.updateMainArea({name}, `main_area_id= ${mainAreaId}`);

        if(result.affectedRows > 0 ) {
            await db.commit();
            response = {
                message: "Main Area updated successfully",
                code: 200
            };
            respCode = 200;
        } else {
            response = {
                message: "general error",
                code: 500
            };
            respCode = 500;
        }

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

export const deleteMainArea = async (req, res) => {
    let respCode, response;
    deleteMainAreaTry: try{
        await db.beginTransaction();
        const {mainAreaId} = req.params;

        if(!mainAreaId) {
            respCode = 403;
            response = {
                message: "Field validation error",
                fields: "mainAreaId should be provided"
            }
            break deleteMainAreaTry;
        }
        const query = createDeleteQuery(MainArea.tableName, mainAreaId, "main_area_id");

        const [result] = await db.query(query);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 204;
            response = {};
        } else {
            await db.commit();
            respCode = 404;
            response = {
                message: "No Main Area with that ID is available",
                code: 404
            };
        }

    } catch(e) {
        await db.rollback();
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }

    res.status(respCode).json(response)

}
