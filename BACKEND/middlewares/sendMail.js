const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.log("Email connection failed: RESEND_API_KEY is missing");
} else {
  console.log("Email server is ready (Resend)");
}

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

module.exports = sendEmail;   