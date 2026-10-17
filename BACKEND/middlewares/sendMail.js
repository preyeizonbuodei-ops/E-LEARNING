// const nodeMailer = require('nodemailer');

// const transport = nodeMailer.createTransport({
//     service: "gmail",
//     auth:{
//         user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
//         pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD
//     }


// })

// transport.verify((error, success) => {
//     if (error) {
//         console.log("Email connection failed:", error);
//     } else {
//         console.log("Email server is ready");
//     }
// });


// module.exports = transport;

// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);


if (!process.env.RESEND_API_KEY) {
  console.log("Email connection failed: RESEND_API_KEY is missing");
} else {
  console.log("Email server is ready (Resend)");
}

/**
 * Send an email using Resend
 * @param {Object} options
 * @param {string|string[]} options.to
 * @param {string} options.subject
 * @param {string} options.html
 * @param {string} [options.text]
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'StudStore <onboarding@resend.dev>',
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    console.log('Email sent successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Failed to send email:', error.message);
    throw error;
  }
};

module.exports = { sendEmail, resend };