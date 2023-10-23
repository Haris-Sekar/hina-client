import express from "express";
import {
    addCustomer,
    addMainArea, deleteCustomer,
    deleteMainArea,
    getCustomers,
    getMainArea, updateCustomer,
    updateMainArea,
    getCustomersCount,
    getMainAreaCount
} from "../controllers/customer.js";
import {authenticateCompany, authenticateUser} from "../middleware/authenticate.js";

const router = express.Router({ mergeParams: true });

router.post('/', authenticateUser,authenticateCompany, addCustomer);
router.get("/customerCount", authenticateUser, authenticateCompany, getCustomersCount);
router.get("/", authenticateUser,authenticateCompany, getCustomers);
router.patch("/:customerId", authenticateUser,authenticateCompany, updateCustomer);
router.delete("/:customerId", authenticateUser,authenticateCompany, deleteCustomer);

router.post("/mainArea", authenticateUser,authenticateCompany, addMainArea);
router.get("/mainAreaCount", authenticateUser, authenticateCompany, getMainAreaCount);
router.get("/mainArea", authenticateUser,authenticateCompany, getMainArea);
router.patch("/mainArea/:mainAreaId", authenticateUser,authenticateCompany, updateMainArea);
router.delete("/mainArea/:mainAreaId",authenticateUser,authenticateCompany, deleteMainArea);

export default  router;
