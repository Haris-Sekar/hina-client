import Company from "../models/Company.js";
import db from "../config/db.js";
import CompanyUserMapping from "../models/CompanyUserMapping.js";

export const createCompany = async (req, res) => {

    let respCode, response;
    
    createCompanyTry: try{
        await db.beginTransaction()
        const {companyName, gstNumber, address} = req.body;

        if(!companyName || !gstNumber || !address) {
            respCode = 403;
            response = {
                fields: ["companyName", "gstNumber", "address"],
                message: "These fields are required"
            }
            break createCompanyTry;
        }

        if(gstNumber?.length < 15) {
            respCode = 403;
            response = {
                fields: ["gstNumber"],
                message: "Gst Number should be 15 digits"
            }
        }

        const company = new Company(companyName, gstNumber, address);
        const result = await company.createCompany(req.userId);

        if(result.affectedRows > 0) {

            const companyUserMapping = new CompanyUserMapping(req.userId, result.insertId);

            const result1 = await companyUserMapping.addCompanyUserMapping(req.userId);

            if(result1.affectedRows > 0) {
                await db.commit();
                respCode = 201;
                response = {
                    code: 201,
                    message: "Company created successfully",
                    companyId: result.insertId
                }
            }
        }

    } catch (e) {
        await db.rollback();
        if(e.code === "ER_DUP_ENTRY") {
            response = {
                message: "A company is already registered with this GST",
                code: 409
            }
            respCode = 409
        } else {
            response = {
                message: e.message,
                code: 500
            }
            respCode = 500;
        }
    }
    res.status(respCode).json(response)
}

export const getCompanyDetails = async(req, res) => {
    let respCode, response;
    try{
        const companies =await Company.getUserCompanies(req.userId);

        let parsedCompanies = [];

        for(let company of companies) {
            parsedCompanies.push(await company.toJSON())
        }

        response = {
            code: 200,
            companies: parsedCompanies[0]
        }
        respCode = 200;

    }  catch (e) {
        response = {
            message: e.message,
            code: 500
        }
        respCode = 500;
    }
    res.status(respCode).json(response);
}


export const addUserToCompany = async (req, res) => {
    let respCode, response;

    addUserToCompanyTry: try{
        await db.beginTransaction();
        const {userId, companyId} = req.body;
        if(!userId || !companyId) {
            respCode = 400;
            response = {
                fields: [!userId ? "userId": "", !companyId ? "companyId" : "" ],
                message: "These fields are required"
            }
            break addUserToCompanyTry;
        }
        const companyUserMapping = new CompanyUserMapping(userId, companyId);
        const result = await companyUserMapping.addCompanyUserMapping(req.userId);
        if(result.affectedRows > 0 ) {
            await db.commit();
            respCode = 201;
            response = {
                code: 201,
                message: "User added to the company successfully"
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