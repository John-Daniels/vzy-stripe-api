import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { CustomError } from "../../utils";
import { handlebarOptions } from "../../constants/mail.constants";

// initailize nodemailer transport
export const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  secure: true,
  port: process.env?.MAIL_PORT || undefined,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

mailer.use("compile", hbs(handlebarOptions));

class EmailService {
  /**
   *
   * @param {string} email - the recipients email
   * @param {string} link - the verification url
   * @returns {Promise}
   */
  static sendVerificationMail = async (email, context) => {
    try {
      const result = await mailer.sendMail({
        to: email,
        subject: "Get your account verified",
        template: "email_verification",
        context,
      });

      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static sendResetPasswordEmail = async ({ email }, link: string) => {
    try {
      const result = await mailer.sendMail({
        to: email,
        subject: "Password Reset",
        template: "resetpw_mail",
        context: {
          link,
          site_name: "VZY Test API",
        },
      });
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  static sendTestMail = async (mail) => {
    try {
      const result = await mailer.sendMail(mail);
      return result;
    } catch (e) {
      console.log(e);
      throw new CustomError("something went wrong", 500);
    }
  };
}

export default EmailService;
