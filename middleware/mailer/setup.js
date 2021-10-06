import nodemailer from "nodemailer";
import config from "../../config/config.js"

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email,
        pass: config.email_pass
    }
});

const sendEmail = async (req, res, next) => {
    const emailOptions = {
        from: config.email,
        to: req.user.email,
        subject: "Hello ✔", // Subject line
        html: `
        <h5>Record Store API</h5>
        <p>Please click <a href="${config.frontendOrigin}/profile/verify-email/${req.user.verified.token}" target="_blank">here</a> to verify your account,</p>
        `
    };

    try {
        await transporter.sendMail(emailOptions);
        console.log(`Verification email sent to ${req.user.email}`);
        next();
    } catch (error) {
        next( error );
    }
};

export default sendEmail;