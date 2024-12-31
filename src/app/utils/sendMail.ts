import nodemailer from "nodemailer"
import config from "../config"

export const sendMail = async (
  to: string,
  subject: string,
  text?: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production" ? true : false, // true for port 465, false for other ports
    auth: {
      user: "dinm309@gmail.com",
      pass: "fukj tbun bbad rrne",
    },
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: "dinm309@gmail.com", // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })
}
