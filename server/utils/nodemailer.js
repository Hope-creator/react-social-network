const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const checkEnv = () => {
  if (!process.env.NODEMAILER_HOST || !process.env.NODEMAILER_PORT || process.env.NODEMAILER_USE || process.env.NODEMAILER_PASS) {
    return false
  }
  return true
}

const emailService = checkEnv() ? nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
}) : null;

module.exports = emailService;
