import express from "express";
import {authenticateCompany, authenticateUser} from "../middleware/authenticate.js";
import {
    createProduct, updateProduct,
    createSize, updateSize,
    createItemGroup, updateItemGroup,
    createRateVersion, updateRateVersion
} from "../controllers/product.js";

const router = express.Router({ mergeParams: true });


router.post("/", authenticateUser, authenticateCompany,  createProduct);
router.patch("/:itemId", authenticateUser, authenticateCompany, updateProduct)

router.post("/size", authenticateUser, authenticateCompany, createSize);
router.patch("/size/:sizeId", authenticateUser, authenticateCompany, updateSize);

router.post("/itemGroup", authenticateUser, authenticateCompany, createItemGroup);
router.patch("/itemGroup/:groupId", authenticateUser, authenticateCompany, updateItemGroup);

router.post("/rateVersion", authenticateUser, authenticateCompany, createRateVersion);
router.patch("/rateVersion/:versionId", authenticateUser, authenticateCompany, updateRateVersion);
router.post("/rateVersion/rates", authenticateUser, authenticateCompany);


export default router;