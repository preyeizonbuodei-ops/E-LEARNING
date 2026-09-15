const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD
    }

    
})

transport.verify((error, success) => {
    if (error) {
        console.log("Email connection failed:", error);
    } else {
        console.log("Email server is ready");
    }
});


module.exports = transport;