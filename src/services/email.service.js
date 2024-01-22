const nodeMailer = require('nodemailer');
require('dotenv').config();

const sendResetEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM_ADDRESS || 'aliakbar192rb@gmail.com',
        to: options.to,
        subject: options.subject,
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="background-color: #fff; margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">

  <table width="100%" bgcolor="#fff" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td>
        <table align="center" bgcolor="#ededed" cellpadding="0" cellspacing="0" border="0" style="max-width: 540px; margin-top: 30px; margin-bottom: 30px; border-radius: 16px;">
          <tr>
            <td align="center" style="padding-top: 26px; padding-bottom: 10px"></td>
          </tr>
          <tr>
            <td align="center" style="color:  #fd5d5d; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 32px; font-style: normal; font-weight: 700; line-height: 36px; letter-spacing: -0.3px;">
              ${options.subject}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px">
              <p style="color:  #484848; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 16px; font-style: normal; font-weight: 700; line-height: 22px; letter-spacing: -0.3px;">
                ${options.text}
              </p>
              <p style="color: #484848; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 16px; font-style: normal; font-weight: 700; line-height: 22px; letter-spacing: -0.3px;">
                Your password: ${options.password.toString()}
              </p>
            </td>
          </tr>
          <tr>
            <td align="left" style="padding-left: 22px; padding-bottom: 39px">
              <span style="color: #484848; font-family: 'Montserrat', sans-serif; font-size: 16px; font-style: normal; font-weight: 700; line-height: 22px; letter-spacing: -0.3px; display: block;">Cheers,</span>
              <span style="color: #484848; font-family: 'Montserrat', sans-serif; font-size: 16px; font-style: normal; font-weight: 700; line-height: 22px; letter-spacing: -0.3px; display: block; margin-top: 7px;">Ropstam</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
        `,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (ex) {
        console.error('Error sending email:', ex);
        throw ex;
    }
};

module.exports = {
    sendResetEmail,
};
