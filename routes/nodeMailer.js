function sendEmail(email){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'goldgolf920@gmail.com',
          pass: 'ab12345.'
        }
      });

      var mailOptions = {
        from: 'goldgolf920@gmail.com',
        to: email,
        subject: 'Thank you for register!',
        text: 'GG App!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports = sendEmail
