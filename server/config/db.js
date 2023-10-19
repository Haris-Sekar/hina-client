import mysql from "mysql2/promise"; 

export const config = { 
    host:"brzhw1vmdolp3u79q9p3-mysql.services.clever-cloud.com",
    user:"um0y9zhwymff0lyn",
    password:"GqVJ7Jh79O5xpMzafZcZ",
    debug:false,
    database:"brzhw1vmdolp3u79q9p3"
}
 

export default await mysql.createConnection(config);
