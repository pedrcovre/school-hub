const nodemailer = require('nodemailer')

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })

  const mailOptions = {
    from: 'School Hub <pedro.j.covre@gmail.com>',
    to: options.to,
    subject: options.subject,
    html: options.html
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
