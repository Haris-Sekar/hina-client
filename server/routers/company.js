import express from "express";
import {createCompany, getCompanyDetails} from "../controllers/company.js";
import {authenticateUser} from "../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticateUser,createCompany);
router.get("/", authenticateUser, getCompanyDetails);


export default  router;
