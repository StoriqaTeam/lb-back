'use strict';
const mailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// Use Smtp Protocol to send Email

module.exports = {

    mail(domain, email, url) {
        return {
            from:     "lucky block <luckyblocktest@yandex.ru>",
            to:       email,
            subject:  'поздравляем с успешной регистрацией',
            text:     `поздравляем с успешной регистрацией. перейдите по ссылке ${domain}/activate?url=${url} для активации`
        }
    },
    smtpTransport: mailer.createTransport("SMTP",{
        service: "Yandex",
        auth: {
            user: "luckyblocktest@yandex.ru",
            pass: "qwerty777666"
        }
    }),
    sendEmail(domain, email, url){
        this.smtpTransport.sendMail(this.mail(domain, email, url), function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            this.smtpTransport.close();
        });
    }
 }
