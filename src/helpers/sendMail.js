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
    html: `<a href="localhost:${PORT}/api/users/verify/${verificationToken}">Confirm your email</a>`,
  });
}

module.exports = sendMail;
