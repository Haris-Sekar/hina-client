import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import * as mail from "../service/mail.js";  
import db from "../config/db.js";
import * as apiMessages from "../static/message.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    let respStatus, response; 
    try {  
        await db.beginTransaction();
        const { name, email, password, mobile, confirmPassword } = req.body;
        const newUser = new Users(
            name,
            email,
            mobile, 
            "",
            false
        );

        if (password.localeCompare(confirmPassword)) {
            response = {
                message: "Password doesn't match",
                code: 422
            }
            respStatus = 422;
        } else {
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            const exisitingUser = await newUser.getUserDetails(0,1);
            if(exisitingUser != null) {
                response = {
                    message: "User already exits with the same Email and Phone",
                    code: 409
                }
                respStatus = 409;
            } else { 
                const result = await newUser.createUser();
                if(result.affectedRows > 0) {

                }
                const accVerification = await mail.accountVerification(newUser);
                if (accVerification?.code !== 200) {
                    response = {
                        message: accVerification.message,
                        code: 500
                    }
                    respStatus = 500;
                }
                else {
                    response = {
                        message: "User created!",
                        status: 201,
                    }
                    respStatus = 201;
                } 
            }

        }
        await db.commit();
    } catch (error) {  
        await db.rollback();
        response = {
            message: error.message,
            code: 500
        }
        respStatus = 500; 

    } 
    res.status(respStatus).json(response); 
} 


export const login = async (req,res) => {
    let response, respCode;
    try{ 
        const {email, password } = req.body;

        const user = new Users();

        user.setEmail(email);

        const userObj = await user.getUserDetails(0,1);

        if(userObj.name === undefined) {
            response = {
                message: apiMessages.INVALID_CREDENTIALS,
                code: 500
            };
            respCode = 500;
        } else {
            const resultOfSalt = await bcrypt.compare(password, userObj.password);

            if (!resultOfSalt) {
                response = {
                    message: "Invalid Credentials",
                    code: 500
                }
                respCode = 500; 
            }  else { 
                if (!userObj.isVerified) {
                    response = {
                        message: "User not verified",
                        status: 401
                    }
                    respCode = 401;
                }
                else {
                    const token = userObj.createToken();
                    res.cookie("jwt_token", token, { maxAge: 604800000 });
                    response = {
                        message: "login success",
                        code: 200,
                        jwt_token: token
                    }
                    respCode = 200;
                }
            } 
        } 
    } catch(error) { 
        response = {
            message: error.message,
            code: 500
        };
        respCode = 500;
    }


    res.status(respCode).json(response);

}

export const accountVerify = async (req, res) => {
    let response, respCode;
    try {
        await db.beginTransaction();
        const tokenData =await jwt.decode(req.body.token); 

        const user = new Users();
        user.setEmail(tokenData.email);
        const userObj = await user.getUserDetails(0, 1);

        if (userObj.isVerified) {
            response = {
                message: "user already verified",
                status: 200
            }
            respCode = 200;
        }
        if (tokenData.dateCreated <= new Date().getTime()) { 
            const result = await userObj.updateUser({is_verified: true}, `email = "${userObj.email}"`);
            response = {
                message: "user verified",
                code: 200
            }
            respCode = 200;
        }
        await db.commit();
    } catch (error) {
        await db.rollback();
        response = {
            message: error.message,
            code: 500
        }
        respCode = 500;

    }
    res.status(respCode).json(response);
}

export const resendMail = async(req, res) => {
    let response, respCode;
    resendMailTry: try{
        const { email, mobile } = req.body;

        if(!email && !mobile) {
            response = {
                message: "email or mobile is required",
                code: 400
            };
            respCode = 400;
            break resendMailTry;
        }


        const user = await Users.getUserDetail(email, mobile);

        if(user === null) {
            respCode = 400;
            response = {
                message: "No user found",
                code: 400
            }
            break resendMailTry;
        }

        if(user.isVerified) {
            respCode = 409;
            response = {
                message: "User already verified",
                code: 409
            }
            break resendMailTry;
        }


        const accVerification = await mail.accountVerification(user);
        if (accVerification?.code !== 200) {
            response = {
                message: accVerification.message,
                code: 500
            }
            respCode = 500;
            break resendMailTry;
        }
        response = {
            message: "Mail sent successfully",
            code: 200
        }
        respCode = 200;
    } catch (error) {
        response = {
            message: error.message,
            code: 500
        }
        respCode = 500;

    }
    res.status(respCode).json(response);
}
