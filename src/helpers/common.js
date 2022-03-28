const nodemailer = require('nodemailer')

const handleNotFound = (req, res, next) => {
  res.status(404)
  res.json({
    status: 'failed',
    code: '404',
    message: 'url not found'
  })
}

const response = (res, result, status, message, pagination) => {
  res.status(status).json({
    status: 'Success',
    code: status || 200,
    data: result,
    message: message || null,
    pagination: pagination
  })
}

const errorHandling = (err, req, res, next) => {
  const statusCode = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode)
  res.json({
    status: statusCode,
    message: message
  })
}

const sendEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  const info = await transporter.sendMail({
    from: '"Zwallet" <trashyuwu11@gmail.com>',
    to: email,
    subject: 'Zwallet Email Verification',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
          body {
              display: flex;
              justify-content: center;
              padding: 0;
              margin: 0;
              background-color: #f6faff;
              font-family: Nunito Sans;
          }
          .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
              box-sizing: border-box;
          }
          a.btn {
              align-items: center;
              background-color: #6379F4;
              color: #FFF;
          }
      </style>
      <body>
          <div class="container">
              <h1 class="">Verify your email address</h1>
              <h4 class="">Please confirm that ${email} is your email address by clicking on the link below</h4>
              <a href="http://localhost:4000/email-verification/${token}" class="btn">Verify my email</a>
          </div>
      </body>
    </html>`
  })
  console.log(info)
}

module.exports = {
  handleNotFound,
  response,
  errorHandling,
  sendEmail
}
