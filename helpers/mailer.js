const config = require("config");
const sender = require("./sender");

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

        sender.sendTheMessage(data);

        return true
    },

    sendRef(email, code) {
        let link = config.get('front_host') + '?ref='+code;
        let data = {
            from: "LuckyBlock <"+config.get('mailer.from')+">",
            to: email,
            subject: `Привет! Зайди по ссылке и получи бонус!`,
            text: "Привет! Зайди по ссылке и получи бонус! " + link,
            html: "<h3>Привет!</h3><p>Зайди по ссылке и получи бонус! </p><p>"+link+"</p>";
        };
        return sender.sendTheMessage(data);
    }
};

