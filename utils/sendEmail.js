const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Campaign Scheduler" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = sendEmail;
