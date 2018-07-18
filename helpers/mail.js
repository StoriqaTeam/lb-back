'use strict';
const mailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// Use Smtp Protocol to send Email

module.exports = {
  sendTheMessage(template){
      let transporter = mailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'coffee3shop@gmail.com',
            pass: 'Ugol115115'
          }
        });

        transporter.sendMail(template, (error, info) =>{
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
          return !!error ? false : true
        });
        return true
    }

}



    
