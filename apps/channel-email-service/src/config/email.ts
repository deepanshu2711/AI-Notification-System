import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deepanshusaini2711@gmail.com",
    pass: "lvjk dufn fvzx jaij",
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
