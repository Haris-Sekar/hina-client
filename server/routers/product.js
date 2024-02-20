import express from "express";
import {
	authenticateCompany,
	authenticateUser,
} from "../middleware/authenticate.js";
import {
	createProduct,
	getProduct,
	updateProduct,
	createSize,
	updateSize,
	getSize,
	deleteSize,
	deleteSizes,
	createItemGroup,
	updateItemGroup,
	getItemGroup,
	deleteItemGroup,
	deleteItemGroups,
	createRateVersion,
	updateRateVersion,
	getRateVersion,
	deleteRateVersion,
	deleteRateVersions
} from "../controllers/product.js";

const router = express.Router({ mergeParams: true });

router.post("/", authenticateUser, authenticateCompany, createProduct);
router.get("/", authenticateUser, authenticateCompany, getProduct);
router.patch("/:itemId", authenticateUser, authenticateCompany, updateProduct);

router.post("/size", authenticateUser, authenticateCompany, createSize);
router.patch(
	"/size/:sizeId",
	authenticateUser,
	authenticateCompany,
	updateSize
);
router.get("/size", authenticateUser, authenticateCompany, getSize);
router.delete(
	"/size/:sizeId",
	authenticateUser,
	authenticateCompany,
	deleteSize
);
router.delete("/size/", authenticateUser, authenticateCompany, deleteSizes);

router.post(
	"/itemGroup",
	authenticateUser,
	authenticateCompany,
	createItemGroup
);
router.patch(
	"/itemGroup/:groupId",
	authenticateUser,
	authenticateCompany,
	updateItemGroup
);
router.get("/itemGroup", authenticateUser, authenticateCompany, getItemGroup);
router.delete(
	"/itemGroup/:groupId",
	authenticateUser,
	authenticateCompany,
	deleteItemGroup
);
router.delete(
	"/itemGroup/",
	authenticateUser,
	authenticateCompany,
	deleteItemGroups
);

router.post(
	"/rateVersion",
	authenticateUser,
	authenticateCompany,
	createRateVersion
);
router.patch(
	"/rateVersion/:versionId",
	authenticateUser,
	authenticateCompany,
	updateRateVersion
);
router.get(
	"/rateVersion",
	authenticateUser,
	authenticateCompany,
	getRateVersion
);
router.delete(
	"/rateVersion/:versionId",
	authenticateUser,
	authenticateCompany,
	deleteRateVersion
);
router.delete(
	"/rateVersion/",
	authenticateUser,
	authenticateCompany,
	deleteRateVersions
);
router.post("/rateVersion/rates", authenticateUser, authenticateCompany);

export default router;
