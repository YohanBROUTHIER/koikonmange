import './envLoad.js';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMailValidateAccount(mailTo, uuid) {
  return await transporter.sendMail({
    from: `"KoiKonmange" <${process.env.MAIL_USER}>`,
    to: mailTo,
    subject: "Validate your account",
    text: `Please validate your email on: ${process.env.BASE_URL}/validate/account/${uuid}`
  });
}

export async function sendMailResetPassword(mailTo, uuid) {
  return await transporter.sendMail({
    from: `"KoiKonmange" <${process.env.MAIL_USER}>`,
    to: mailTo,
    subject: "Reset your password",
    text: `Please change your password on: ${process.env.BASE_URL}/validate/password/${uuid}`
  });
}



