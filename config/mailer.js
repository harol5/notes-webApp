const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hrcode95@gamil.com",
    pass: "00000000000000000",
  },
});

module.exports = transporter;
