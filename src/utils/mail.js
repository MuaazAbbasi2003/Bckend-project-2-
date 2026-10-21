import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendemail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://TaskManager.com",
    },
  });
};
const emailText = mailGenerator.generatePlaintext(options.generateEmail);
const emailHTML = mailGenerator.generate(options.generateEmail);

var transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
const mail = {
  from: "muaazabbasi2003@gmail.com ",
  to: options.email,
  subject: options.subject,
  text: emailText,
  html: emailHTML,
};
try {
  await transporter.sendMail(mail);
} catch (error) {
  console.error("Error sending email:", error);
}
const generateEmail = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordEmail = (username, forgotPasswordURL) => {
  return {
    body: {
      name: username,
      intro:
        "We received a request to reset your password. If you did not make this request, please ignore this email.",
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: forgotPasswordURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { sendemail, generateEmail, forgotPasswordEmail };
