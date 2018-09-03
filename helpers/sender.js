'use strict';
const config = require("config");
const mailer = require('nodemailer');

if (!config.get('mailer.password') && !config.get('mailer.from')) {
    console.log('Please set mailer from and password');
}

module.exports = {
    sendTheMessage(template) {
        let transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get('mailer.from'),
                pass: config.get('mailer.password')
            }
        });

        transporter.sendMail(template, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            return !!error ? false : true
        });
        return true
    }
};



    
