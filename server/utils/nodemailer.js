const nodemailer = require("nodemailer");


const emailService = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rigoberto.walsh@ethereal.email',
        pass: 'wH9Tx3xvpD6Nm2Yed3'
    }
});

module.exports = emailService;