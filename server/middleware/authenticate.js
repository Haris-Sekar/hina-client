import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

export const authenticateUser = async (req, res, next) => {

    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({
            code: 401,
            message: "Unauthorized access",
        })
    } else {
        const parsedToken = token.split(" ")[1];
        try {
            const authJson = jwt.decode(parsedToken, process.env.PRIVATEKEY);
            const user = Users.getUserPojo(authJson);
            const userDetails = await user.getUserDetails();

            if(userDetails.email === authJson.email && userDetails.userId === authJson.id && userDetails.isVerified) {
                req.userId = userDetails.userId;
                req.email = userDetails.email;
                next();
            } else {
                res.status(401).json({
                    code: 401,
                    message: "Unauthorized access",
                })
            }
        } catch (e) {
            res.status(500).json({
                code: 500,
                message: "Internal Server Error",
                error: e.message,
                stackTrace: e.stackTrace
            });
        }
    }


}