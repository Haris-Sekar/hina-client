import Company from "../models/Company.js";
import db from "../config/db.js";

export const createCompany = async (req, res) => {

    let respCode, response;
    
    createCompanyTry: try{
        await db.beginTransaction()
        const {name, gst, address} = req.body;

        if(!name || !gst || !address) {
            respCode = 400;
            response = {
                fields: ["name", "gst", "address"],
                message: "These fields are required"
            }
            break createCompanyTry;
        }

        const company = new Company(name, gst, address);
        const result = await company.createCompany(req.userId);

        if(result.affectedRows > 0) {
            respCode = 201;
            response = {
                code: 201,
                message: "Company created successfully"
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