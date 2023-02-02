const nodemailer = require('nodemailer');

const { PORT, EMAIL_USER, EMAIL_PASS } = process.env;

async function sendMail({ email, verificationToken }) {
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transport.sendMail({
    from: 'info@contacts.com',
    to: email,
    subject: 'Email verification',
    html: `<p>You have successfully registered. Please verify your email by clicking on the link:</p>
    <a href="localhost:${PORT}/api/users/verify/${verificationToken}">confirm your email</a>
    <p>If you have not registered, please delete this message.</p>`,
    text: `You have successfully registered. 
Please verify your email by following the link:
http://localhost:3000/api/users/verify/${verificationToken} 
If you have not registered, please delete this message.`,
  });
}

module.exports = sendMail;
