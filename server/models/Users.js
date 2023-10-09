import db from "../config/db.js";
import { createInsertQuery, createUpdateQuery } from "../config/query.js";
import jwt from "jsonwebtoken";
export default class Users {
  userId;
  name;
  email;
  mobile;
  password;
  isVerified;
  constructor(name, email, mobile, password, isVerified) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.isVerified = isVerified;
  }

  setName(name) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    this.name = name;
  }

  setEmail(email) {
    this.email = email;
  }

  setMobile(mobile) {
    this.mobile = mobile;
  }

  setPassword(password) {
    this.password = password;
  }

  setIsVerified(isVerified) {
    if (typeof isVerified !== "boolean") {
      throw new Error("isVerified must be a boolean");
    }
    this.isVerified = isVerified;
  }

  toMySQLJSON() {
    const jsonObject = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      is_verified: this.isVerified,
    };

    if (this.userId != undefined) {
      jsonObject.user_id = this.userId;
    }

    return jsonObject;
  }

  static fromJSON(json) {
    const { user_id, name, email, mobile, password, is_verified } = json;

    const user = new Users(name, email, mobile, password, is_verified);

    if (user_id != undefined) {
      user.userId = user_id;
    }
 
    return user;
  }

  async getUserDetails(index = 0, range = 1) {
    const query = `select * from users where email='${this.email}' ${
      this.mobile !== undefined ? `or mobile='${this.mobile}'` : ""
    }  limit ${index},${range};`;

    const [result] = await db.query(query);

    if (result.length > 0) {
      return Users.fromJSON(result[0]);
    } else {
      return null;
    }
  }

  async createUser() {
    const query = createInsertQuery("users", this.toMySQLJSON());

    const [result] = await db.query(query);

    return result;
  }

  async updateUser(updateObj, condition) {
    const query = createUpdateQuery("users", updateObj, condition);

    const [result] = await db.query(query);

    return result;
  }

  createToken() {
    return jwt.sign(
      {
        id: this.userId,
        email: this.email,
        name: this.name,
        isVerified: this.isVerified,
      },
      process.env.PRIVATEKEY
    );
  }

  static getUserPojo(tokenObj) {
    const user = new Users();
    user.userId = tokenObj.id;
    user.email = tokenObj.email;
    user.name = tokenObj.name;
    user.isVerified = tokenObj.isVerified;
    return user;

  }

}
