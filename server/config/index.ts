import { createTransport, Transporter } from "nodemailer"

const smtp = {
    HOST: process.env.EMAIL_HOST,
    PORT: parseInt(process.env.EMAIL_PORT || ""),
    USESSL: JSON.parse(process.env.EMAIL_USESSL || "false"),
    USERNAME: process.env.EMAIL_USERNAME,
    PASSWORD: process.env.EMAIL_PASSWORD
}

const smtp_options = {
    from: process.env.EMAIL_SENDER,
    to: "nathanieltjames24@yahoo.com",
    subject: "Account Activated",
    html: "",
};

const smtp_transport: Transporter = createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    host: smtp.HOST,
    port: smtp.PORT,
    secure: smtp.USESSL, // upgrade later with STARTTLS
    auth: {
        user: smtp.USERNAME,
        pass: smtp.PASSWORD,
    },
})


export const NODE_ENV = process.env.NODE_ENV || "";
export const APP_NAME = process.env.APP_NAME || "";
export const CONNECTION_STRING = process.env.CONNECTION_STRING || "";
export const PORT = parseInt(process.env.PORT || "3080");
export const HASH = process.env.HASH || "";
export const APP_DOMAIN = process.env.APP_DOMAIN || "";
export const SMTP = { options: smtp_options, transporter: smtp_transport };