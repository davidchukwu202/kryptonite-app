const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  auth: {
    user: process.env.ELASTICEMAIL_USERNAME,
    pass: process.env.ELASTICEMAIL_PASSWORD,
  },
});

module.exports = transporter;
