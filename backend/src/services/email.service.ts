import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

dotenv.config();

// Email configuration
const emailConfig = {
  service: process.env.EMAIL_SERVICE || "gmail",
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  from: process.env.EMAIL_FROM || "Hadeer's Candle <no-reply@hadeerscandle.com>",
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("Email transporter verification failed:", error);
  } else {
    console.log("Email service is ready to send messages");
  }
});

// Template handling
const loadTemplate = (templateName: string, data: any): string => {
  const templatePath = path.join(__dirname, `../../templates/${templateName}.hbs`);
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);
  return template(data);
};

// Email service methods
export const EmailService = {
  /**
   * Send verification email
   */
  sendVerificationEmail: async (options: {
    email: string;
    name: string;
    verificationToken: string;
  }) => {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${options.verificationToken}`;

    const mailOptions = {
      from: emailConfig.from,
      to: options.email,
      subject: "Verify Your Email Address",
      html: loadTemplate("verify-email", {
        name: options.name,
        verificationUrl,
      }),
    };

    await transporter.sendMail(mailOptions);
  },

  /**
   * Send password reset email
   */
  sendPasswordResetEmail: async (options: {
    email: string;
    name: string;
    resetToken: string;
  }) => {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${options.resetToken}`;

    const mailOptions = {
      from: emailConfig.from,
      to: options.email,
      subject: "Password Reset Request",
      html: loadTemplate("reset-password", {
        name: options.name,
        resetUrl,
      }),
    };

    await transporter.sendMail(mailOptions);
  },

  /**
   * Send welcome email
   */
  sendWelcomeEmail: async (options: { email: string; name: string }) => {
    const mailOptions = {
      from: emailConfig.from,
      to: options.email,
      subject: "Welcome to Hadeer's Candle!",
      html: loadTemplate("welcome", {
        name: options.name,
      }),
    };

    await transporter.sendMail(mailOptions);
  },
};

// For backward compatibility
export const sendVerificationEmail = EmailService.sendVerificationEmail;
export const sendPasswordResetEmail = EmailService.sendPasswordResetEmail;

export default EmailService;