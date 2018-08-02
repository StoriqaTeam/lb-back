const config = require("config");
const mailer = require('nodemailer');

if (!config.get('mailer.password') && !config.get('mailer.from')) {
    console.log('Please set mailer from and password');
}
let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('mailer.from'),
        pass: config.get('mailer.password')
    }
});

module.exports = {
    sendActivation(email, code) {
        let link = config.get('front_host')+'/user/activate?key='+code;
        let data = {
            from: "LuckyBlock <"+config.get('mailer.from')+">",
            to: email,
            subject: 'Registration to Lucky Block',
            text: 'Thanks for signing up at Lucky Block! Activate your account by visiting the following link:\n\n' + link,
            html: "<h3>Thanks for signing up at Lucky Block!</h3>Activate your account by visiting the following link:<br>"+link
        };
        // console.log("data", data);

        transporter.sendMail(data, (error, info) =>{
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