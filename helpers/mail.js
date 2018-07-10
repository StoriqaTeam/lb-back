'use strict';
const mailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// Use Smtp Protocol to send Email

module.exports = {
  sendTheMessage(email, id){
        console.log(email)
      var transporter = mailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'coffee3shop@gmail.com',
            pass: 'Ugol115115'
          }
        });

        var mailOptions = {
          from: 'coffee3shop@gmail.com',
          to: email,
          subject: `Поздравляем! Аккаунт зарегистрирован.`,
          text: `Поздравляем! Аккаунт зарегистрирован. Перейдите по ссылке http://localhost:3000/sign/activate?hash=${Math.pow(id, 2)}`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }

}



    
