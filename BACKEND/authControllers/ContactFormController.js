const transport = require("../middlewares/sendMail");
const User = require("../modules/registerSchema");


exports.ContactFormController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please Fill In the Fields"
            });
        }

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "You are not an existing User"
            });
        }

        const UserSendEmail = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            replyTo: email,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 24px;">
                    <h2>New StudStore Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            `
        });

        if (!UserSendEmail.accepted || UserSendEmail.accepted.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Email Sending Failed, Try Again"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email Sent"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the email"
        });
    }
};