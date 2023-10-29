import db from "../config/db.js";
import {INTERNAL_SERVER_ERR} from "../static/message.js";
import Size from "../models/Size.js";
import ItemGroup from "../models/ItemGroup.js";
import RateVersion from "../models/RateVersion.js";
import Rate from "../models/Rate.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    let respCode, response;
    createProductTry: try{
        await db.beginTransaction();

        let {itemName, itemGroupId, hsn, rateObject} = req.body;

        let missingFields = [!itemName ? "itemName" : "", !itemGroupId ? "itemGroupId" : "", !rateObject ? "rateObject" : ""];
        missingFields =  missingFields.filter(function(element) {
            return element !== "";
        });

        if(missingFields.length > 0) {
            respCode = 409;
            response = {
                message: "field validation error, bellow fields are required",
                fields: missingFields
            }
            await db.rollback();
            break createProductTry;
        }

        rateObject = JSON.parse(rateObject)

        if(!rateObject.rates || !rateObject.versionId) {
            respCode = 409;
            response = {
                message: "field validation error, rateObject should have versionId & rates",
                fields: [rateObject]
            }
            await db.rollback();
            break createProductTry;
        }


        const productObject = new Product(itemName, hsn, itemGroupId);
        productObject.companyId = req.companyId;

        const result = await productObject.createProduct(req.userId);
        if(result.affectedRows > 0) {
            const parsedRateObject = Rate.getParsedRateObject(rateObject.rates, result.insertId, rateObject.versionId);
            const rateResult = await Rate.pushRateObject(parsedRateObject, req.userId);
            if(rateResult.length === rateObject.rates.length) {
                respCode = 201;
                response = {
                    code: 201,
                    message: "Product added successfully",
                };
            } else {
                respCode = 201;
                response = {
                    code: 201,
                    message: "Product added successfully, but some rates are not added",
                }
            }
        } else {
            respCode = 500;
            response = {
                code: 500,
                message: INTERNAL_SERVER_ERR
            }
        }
        await db.commit();
    } catch (e) {
        await db.rollback();
        if(e.code === "ER_DUP_ENTRY") {
            if(e.sql.includes("rate")) {
                response = {
                    code: 409,
                    message: "the rate for this size is already exisits for this version"
                }
            }
            respCode = 409;

        } else {
            respCode = 500;
            response = {
                code: 500,
                message: INTERNAL_SERVER_ERR
            }
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
    createItemGroupTry: try{
        await db.beginTransaction()
        const { name } = req.body;

        if(!name) {
            respCode = 409;
            response = {
                message: "field validation error, bellow fields are required",
                fields: ["name"]
            }
            await db.rollback();
            break createItemGroupTry;
        }

        const groupObj = new ItemGroup(name);

        groupObj.companyId = req.companyId;

        const result = await groupObj.addGroup(req.userId);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 201;
            response = {
                message: "Item Group added successfully",
                code: 201,
                itemGroupId: result.insertId
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
                message: "the given Item Group is already added"
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

export const updateItemGroup = async (req, res) => {
    let respCode, response;
    updateItemGroupTry: try{
        await db.beginTransaction();
        const {name} = req.body;
        const {groupId} = req.params;
        if( !name) {
            await db.rollback();
            respCode = 409;
            response = {
                message: "field validation error, these fields should be required",
                fields: [ !name ? "name" : "" ],
                code: 409
            }
            break updateItemGroupTry;
        }

        const groupObj = new ItemGroup(name);
        groupObj.name = name;
        groupObj.groupId = groupId;
        groupObj.companyId = req.companyId;

        const result = await groupObj.updateGroup(req.userId);
        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 200;
            response = {
                message: "Item Group updated successfully",
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

export const getItemGroup = async (req, res) => {
    let respCode, response;

    try{
        const { itemGroupId } = req.query;
        const { companyId } = req.params;

        if(itemGroupId != null) {
            const itemGroupDetails = await ItemGroup.getItemGroup(companyId, itemGroupId)
            respCode = 200;
            response = itemGroupDetails;
        } else {
            const itemGroupDetails = await ItemGroup.getItemGroups(companyId);
            respCode = 200;
            response = {
                "companyId": companyId,
                "resultCount": itemGroupDetails.length,
                "result": itemGroupDetails
            };
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


export const deleteItemGroup = async (req, res) => {
    let respCode, response;
    deleteItemGroupTry: try{
        await db.beginTransaction();
        const { groupId } = req.params;

        if(!groupId) {
            respCode = 403;
            response = {
                message: "Field validation error",
                fields: "groupId should be provided"
            }
            break deleteItemGroupTry;
        }

        const groupObj = new ItemGroup();
        const result = await groupObj.deleteItemGroup(groupId);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 204;
            response = {};
        } else {
            await db.commit();
            respCode = 404;
            response = {
                message: "No Item group with that ID is available",
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


export const createRateVersion = async (req, res) => {
    let respCode, response;
    createRateVersionTry: try{
        await db.beginTransaction()
        const { isDefault } = req.body;

        if(!isDefault) {
            respCode = 409;
            response = {
                message: "field validation error, bellow fields are required",
                fields: ["isDefault"]
            }
            await db.rollback();
            break createRateVersionTry;
        }

        const rateVersionObj = new RateVersion();
        rateVersionObj.isDefault = isDefault;

        rateVersionObj.companyId = req.companyId;

        const result = await rateVersionObj.addVersion(req.userId);

        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 201;
            response = {
                message: "Rate Version added successfully",
                code: 201,
                versionId: result.insertId
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
    res.status(respCode).json(response);
}

export const updateRateVersion = async (req, res) => {
    let respCode, response;
    updateRateVersionTry: try{
        await db.beginTransaction();
        const {isDefault} = req.body;
        const {versionId} = req.params;
        if( !isDefault ) {
            await db.rollback();
            respCode = 409;
            response = {
                message: "field validation error, these fields should be required",
                fields: [ !isDefault ? "isDefault" : "" ],
                code: 409
            }
            break updateRateVersionTry;
        }

        const rateVersionObj = new RateVersion();
        rateVersionObj.isDefault = isDefault;
        rateVersionObj.versionId = versionId;
        rateVersionObj.companyId = req.companyId;

        const result = await rateVersionObj.updateVersion(req.userId);
        if(result.affectedRows > 0) {
            await db.commit();
            respCode = 200;
            response = {
                message: "Rate Version updated successfully",
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