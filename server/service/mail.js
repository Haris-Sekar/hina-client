import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { verificationTemplate, frontEndBaseUrl } from "../static/static.js";

export const accountVerification = async (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      dateCreated: new Date().getTime(),
    },
    process.env.PRIVATEKEY
  );
  const props = {
    link: frontEndBaseUrl + "verify/" + token,
    name: user.name,
  };
  const htmlContent = verificationTemplate(props);
  var mailOptions = {
    from: process.env.EMAILUSER,
    to: user.email,
    subject: "Confirm Your Email Address",
    html: htmlContent,
  };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const resp = await transporter.sendMail(mailOptions);
  return {
    message: "Mail sent",
    code: 200,
  };
};
