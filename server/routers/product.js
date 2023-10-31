import express from "express";
import {authenticateCompany, authenticateUser} from "../middleware/authenticate.js";
import {
    createProduct, updateProduct,
    createSize, updateSize, getSize, deleteSize,
    createItemGroup, updateItemGroup, getItemGroup, deleteItemGroup,
    createRateVersion, updateRateVersion, getRateVersion, deleteRateVersion
} from "../controllers/product.js";

const router = express.Router({ mergeParams: true });


router.post("/", authenticateUser, authenticateCompany,  createProduct);
router.patch("/:itemId", authenticateUser, authenticateCompany, updateProduct)

router.post("/size", authenticateUser, authenticateCompany, createSize);
router.patch("/size/:sizeId", authenticateUser, authenticateCompany, updateSize);
router.get("/size", authenticateUser, authenticateCompany, getSize);
router.delete("/size/:sizeId", authenticateUser, authenticateCompany, deleteSize);

router.post("/itemGroup", authenticateUser, authenticateCompany, createItemGroup);
router.patch("/itemGroup/:groupId", authenticateUser, authenticateCompany, updateItemGroup);
router.get("/itemGroup", authenticateUser, authenticateCompany, getItemGroup);
router.delete("/itemGroup/:groupId", authenticateUser, authenticateCompany, deleteItemGroup);

router.post("/rateVersion", authenticateUser, authenticateCompany, createRateVersion);
router.patch("/rateVersion/:versionId", authenticateUser, authenticateCompany, updateRateVersion);
router.get("/rateVersion", authenticateUser, authenticateCompany, getRateVersion);
router.delete("/rateVersion/:versionId", authenticateUser, authenticateCompany, deleteRateVersion);
router.post("/rateVersion/rates", authenticateUser, authenticateCompany);


export default router;