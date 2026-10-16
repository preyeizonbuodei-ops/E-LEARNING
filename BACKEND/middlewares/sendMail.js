
const nodeMailer = require("nodemailer");

const transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD,
    },
});

transport.verify((error, success) => {
    if (error) {
        console.log("Email connection failed:", error);
    } else {
        console.log("Email server is ready");
    }
});

module.exports = transport;
