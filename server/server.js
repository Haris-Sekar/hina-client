import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
 

const app = express();



app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());
app.use(morgan('combined'));
dotenv.config();

import { createTable } from "./config/dataBaseConfig/execute.js";

await createTable();


import user from "./routers/user.js";
import customer from "./routers/customer.js";
import company from "./routers/company.js";

app.use("/api/v1/user",user);
app.use("/api/v1/company", company)

app.use("/api/v1/company/:companyId/customer", customer);

const port = process.env.PORT; 

app.listen(port, () => console.log(`server started at port ${port}`));