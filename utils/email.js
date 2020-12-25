const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, messageAndUrl) {
    this.to = user.email;
    this.name = user.name || "";
    this.messageAndUrl = messageAndUrl;
    this.from = "DroidCart <kesofty@gmail.com>";
  }

  // Transport
  newTransport() {
    // if (process.env.NODE_ENV !== "development") { // TODO: Make it production
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    })
    // }
    /*return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      secureConnection: false,
      port: 2525,
      auth: {
        user: "c9c845bf0ded80",
        pass: "3845e9a102e69b"
      }
    });*/
  }

  // To send an Email
  async send(template, subject) {
    // try {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: template
    };
    await this.newTransport().sendMail(mailOptions);
    // console.log(g);

    // } catch (err) {
    //   console.log("Email: ", err);
    // }
  }

  async sendWelcome() {
    await this.send(this.messageAndUrl, "Welcome to DroidCart!");
  }

  async sendPasswordReset() {
    await this.send(
      this.messageAndUrl,
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}