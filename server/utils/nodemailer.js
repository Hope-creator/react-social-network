const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const emailService = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports = emailService;
