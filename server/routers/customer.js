import express from "express";
import {
    addCustomer,
    addMainArea, deleteCustomer,
    deleteMainArea,
    getCustomers,
    getMainArea, updateCustomer,
    updateMainArea
} from "../controllers/customer.js";
import {authenticateUser} from "../middleware/authenticate.js";

const router = express.Router();

router.post('/', authenticateUser,authenticateCompany, addCustomer);
router.get("/", authenticateUser, getCustomers);
router.patch("/:customerId", authenticateUser, updateCustomer);
router.delete("/:customerId", authenticateUser, deleteCustomer);

router.post("/mainArea", authenticateUser, addMainArea);
router.get("/mainArea", authenticateUser, getMainArea);
router.patch("/mainArea/:mainAreaId", authenticateUser, updateMainArea);
router.delete("/mainArea/:mainAreaId",authenticateUser, deleteMainArea)

export default  router;
