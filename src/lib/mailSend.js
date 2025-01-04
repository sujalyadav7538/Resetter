import PasswordResetEmail from "@/templates/mail";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Correct host for Gmail
  port: 587, // Use 587 for TLS (secure: false)
  secure: false, // Set to true for port 465, false otherwise
  auth: {
    user: process.env.HOST_ADDRESS, // Replace with your Gmail address
    pass: process.env.HOST_PASSWORD, // Use an App Password for Gmail
  },
});

async function SendMail({ link, reciepent }) {
  try {
    console.log(link, reciepent);
    // Render JSX to HTML
    const htmlContent = PasswordResetEmail({userName:reciepent,resetLink:link})

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `<${process.env.HOST_ADDRESS}>`, // sender address
      to: reciepent, // list of receivers
      subject: "Password Reset Mail", // Subject line
      text: "", // plain text body (optional)
      html: htmlContent, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export default SendMail;
