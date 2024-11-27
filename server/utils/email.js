const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(email, firstName) {
    (this.to = email),
      (this.firstName = firstName),
      (this.from = `Support ${process.env.EMAIL_SUPPORT}`);
  }

  newEmail() {
    if (process.env.NODE_ENV.match("development")) {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
  }

  async send(subject, body) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: body,
    };

    await this.newEmail().sendMail(mailOptions);
  }
};
