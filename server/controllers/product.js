import db from "../config/db.js";
import {INTERNAL_SERVER_ERR} from "../static/message.js";
import Size from "../models/Size.js";

export const createProduct = async (req, res) => {
    let respCode, response;
    try{

        const {itemName, itemGroupId} = req.body;


    } catch (e) {
        await db.rollback();
        respCode = 500;
        response = {
            code: 500,
            message: INTERNAL_SERVER_ERR
        }
    }
    res.status(respCode).json(response)
}


export const createSize = async (req, res) => {
    let respCode, response;
    addSizeTry: try{
        await db.beginTransaction()
        const { size } = req.body;

        if(!size) {
            respCode = 409;
            response = {
                message: "field validation error, bellow fields are required",
                fields: ["size"]
            }
            await db.rollback();
            break addSizeTry;
        }

        const sizeObj = new Size(size);

        sizeObj.companyId = req.companyId;

        const result = await sizeObj.addSize(req.userId);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 201;
            response = {
                message: "size added successfully",
                code: 201,
                sizeId: result.insertId
            };
        } else {
            respCode = 500;
            response = {
                message: INTERNAL_SERVER_ERR,
                code: 500
            }
        }

    } catch (e) {
        await db.rollback();
        if(e.code === "ER_DUP_ENTRY") {
            respCode = 409;
            response = {
                code: 409,
                message: "the given size is already added"
            }
        } else {
            respCode = 500;
            response = {
                code: 500,
                message: INTERNAL_SERVER_ERR
            }
        }

    }
    res.status(respCode).json(response);
}

export const updateSize = async (req, res) => {
    let respCode, response;
    updateSizeTry: try{
        await db.beginTransaction();
        const {size} = req.body;
        const {sizeId} = req.params;
        if( !size) {
            await db.rollback();
            respCode = 409;
            response = {
                message: "field validation error, these fields should be required",
                fields: [ !size ? "size" : "" ],
                code: 409
            }
            break updateSizeTry;
        }

        const sizeObj = new Size();
        sizeObj.size = size;
        sizeObj.sizeId = sizeId;
        sizeObj.companyId = req.companyId;

        const result = await sizeObj.updateSize(req.userId);
        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 200;
            response = {
                message: "size updated successfully",
                code: 200
            };
        } else {
            respCode = 500;
            response = {
                message: INTERNAL_SERVER_ERR,
                code: 500
            }
        }

    } catch (e) {
        await db.rollback();
        respCode = 500;
        response = {
            code: 500,
            message: INTERNAL_SERVER_ERR
        }
    }
    res.status(respCode).json(response)
}


export const createItemGroup = async (req, res) => {
    let respCode, response;
    addSizeTry: try{
        await db.beginTransaction()
        const { name } = req.body;

        if(!name) {
            respCode = 409;
            response = {
                message: "field validation error, bellow fields are required",
                fields: ["size"]
            }
            await db.rollback();
            break addSizeTry;
        }

        const sizeObj = new Size(size);

        sizeObj.companyId = req.companyId;

        const result = await sizeObj.addSize(req.userId);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 201;
            response = {
                message: "size added successfully",
                code: 201,
                sizeId: result.insertId
            };
        } else {
            respCode = 500;
            response = {
                message: INTERNAL_SERVER_ERR,
                code: 500
            }
        }

    } catch (e) {
        await db.rollback();
        if(e.code === "ER_DUP_ENTRY") {
            respCode = 409;
            response = {
                code: 409,
                message: "the given size is already added"
            }
        } else {
            respCode = 500;
            response = {
                code: 500,
                message: INTERNAL_SERVER_ERR
            }
        }

    }
    res.status(respCode).json(response);
}

export const updateSize = async (req, res) => {
    let respCode, response;
    updateSizeTry: try{
        await db.beginTransaction();
        const {size} = req.body;
        const {sizeId} = req.params;
        if( !size) {
            await db.rollback();
            respCode = 409;
            response = {
                message: "field validation error, these fields should be required",
                fields: [ !size ? "size" : "" ],
                code: 409
            }
            break updateSizeTry;
        }

        const sizeObj = new Size();
        sizeObj.size = size;
        sizeObj.sizeId = sizeId;
        sizeObj.companyId = req.companyId;

        const result = await sizeObj.updateSize(req.userId);
        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 200;
            response = {
                message: "size updated successfully",
                code: 200
            };
        } else {
            respCode = 500;
            response = {
                message: INTERNAL_SERVER_ERR,
                code: 500
            }
        }

    } catch (e) {
        await db.rollback();
        respCode = 500;
        response = {
            code: 500,
            message: INTERNAL_SERVER_ERR
        }
    }
    res.status(respCode).json(response)
}