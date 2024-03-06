// import {DBOperations} from "../db.js";

// export const createConnection = async (req, res, next) => {
//     try{
//         req.db = await new DBOperations();
//         next();
//     } catch (e) {
//         res.status(500).json(e);
//     }
// }

// export const dropConnection = async (req, res, next) => {
//     try{
//         await req.db.dropConnection();
//         next();
//     } catch (e) {
//         res.status(500).json(e);
//     }
// }
