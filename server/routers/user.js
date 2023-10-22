import express from "express";
import * as users from "../controllers/user.js";

const router = express.Router();

router.post('/signup', users.signup);
router.post('/login', users.login);
router.post("/verify",users.accountVerify);
router.put("/resend-mail", users.resendMail)

export default router;
