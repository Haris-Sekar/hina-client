import express from "express";
import {addCustomer, getCustomer} from "../controllers/customer.js";
import {authenticateUser} from "../middleware/authenticate.js";

const router = express.Router();

router.post('/', authenticateUser, addCustomer);
router.get("/", authenticateUser, getCustomer);

export default  router;
