// utils/email.js

const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harthikcomrade@gmail.com',
    pass: '12345'
  }
});

// Function to send OTP via email
async function sendOTP(email, otp) {
  try {
    const mailOptions = {
      from: '12345',
      to: email,
      subject: 'Your OTP for Login',
      text: `Your OTP is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
}

module.exports = sendOTP;
