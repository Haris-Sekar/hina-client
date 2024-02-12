import express from "express";
import {
	addCustomer,
	addMainArea,
	deleteCustomer,
	deleteMainArea,
	getCustomers,
	getMainArea,
	updateCustomer,
	updateMainArea,
	getCustomersCount,
	getMainAreaCount,
	deleteCustomers,
	deleteMainAreas,
} from "../controllers/customer.js";
import {
	authenticateCompany,
	authenticateUser,
} from "../middleware/authenticate.js";
import validation from "../middleware/validation/validation.js";
import * as validators from "../middleware/validation/validators.js";

const router = express.Router({ mergeParams: true });

router.post(
	"/",
	authenticateUser,
	authenticateCompany,
	validation(validators.addCustomer),
	addCustomer
);
router.get("/count", authenticateUser, authenticateCompany, getCustomersCount);
router.get("/", authenticateUser, authenticateCompany, getCustomers);
router.patch(
	"/:customerId",
	authenticateUser,
	authenticateCompany,
	updateCustomer
);
router.delete(
	"/mainArea/",
	authenticateUser,
	authenticateCompany,
	deleteMainAreas
);
router.delete(
	"/:customerId",
	authenticateUser,
	authenticateCompany,
	deleteCustomer
);
router.delete("/", authenticateUser, authenticateCompany, deleteCustomers);

router.post("/mainArea", authenticateUser, authenticateCompany, addMainArea);
router.get("/count", authenticateUser, authenticateCompany, getMainAreaCount);
router.get("/mainArea", authenticateUser, authenticateCompany, getMainArea);
router.patch(
	"/mainArea/:mainAreaId",
	authenticateUser,
	authenticateCompany,
	updateMainArea
);
router.delete(
	"/mainArea/:mainAreaId",
	authenticateUser,
	authenticateCompany,
	deleteMainArea
);

export default router;
