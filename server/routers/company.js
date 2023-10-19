import express from "express";
import {createCompany} from "../controllers/company.js";
import {authenticateUser} from "../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticateUser,createCompany)


export default  router;
