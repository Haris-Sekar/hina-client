import express from "express";
import {authenticateCompany, authenticateUser} from "../middleware/authenticate.js";
import {createSize, createProduct, updateSize} from "../controllers/product.js";

const router = express.Router({ mergeParams: true });


router.post("/", authenticateUser, authenticateCompany,  createProduct)


router.post("/size", authenticateUser, authenticateCompany, createSize);
router.patch("/size/:sizeId", authenticateUser, authenticateCompany, updateSize);

router.post("/itemGroup", authenticateUser, authenticateCompany, createItemGroup);

export default router;