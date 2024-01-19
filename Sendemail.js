// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "chmuneebengr@gmail.com", // replace with your Gmail email
    pass: "eqkv kqgv kjld iisf", // replace with your Gmail password or an app-specific password
    },
  });


// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };
// var server = app.listen(3000, function () {
//     var host = server.address().address
//     var port = server.address().port
 
//     console.log("Example app listening at http://%s:%s", host, port)
//  })
const otpMap = new Map();

app.post('/sendOTP', (req, res) => {
  const { email,userOTP} = req.body;
console.log("recive this email by user",email);
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }
  if(!userOTP){
    return res.status(400).json({ success: false, message: 'User OTP is required.' });
  }

  const otp = userOTP;
  otpMap.set(email, otp);
console.log(email, otp);
  const mailOptions = {
    from: 'chmuneebengr@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
        console.log(email, otp);
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send OTP email.' });
    }

    res.json({ success: true, message: 'OTP sent successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});