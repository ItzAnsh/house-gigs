import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (to, subject, verifyToken) => {
  console.log(process.env.SMTP_HOST);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject,
      html: `<h1>Verify your email</h1>
    <p>Click <a href="${process.env.CLIENT_URL}/user/verify/${verifyToken}">here</a> to verify your email</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log('error sending email:\n', e);
  }
};
