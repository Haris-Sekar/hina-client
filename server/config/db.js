import mysql from "mysql2/promise"; 

export const config = { 
    host:"localhost",
    user:"root",
    password:"haris1400",
    debug:false,
    database:"pos"
}
 

export default await mysql.createConnection(config);
