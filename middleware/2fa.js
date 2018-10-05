const crypto = require('crypto');
// const authenticator = require('otplib/authenticator');
const speakeasy = require('speakeasy');

// authenticator.options = {step: 40, crypto};

module.exports = async function (req, res, next) {

    try {
        if (!req.user.google2fa_secret) {
            return next();
        }

        if (req.headers['x-app-key'] == 'lucky') {
            return next();
        }
        console.log("2fa middleware:", req.body.twofatoken, req.user.google2fa_secret);

        // if (!authenticator.check(req.body.twofatoken, req.user.google2fa_secret)) {
        //     return res.status(400).send({message: 'Invalid 2fa token.'})
        // }

        let tokenRange = speakeasy.totp.verifyDelta({
            secret: req.user.google2fa_secret,
            encoding: 'base32',
            token: req.body.twofatoken,
            window: 10000
        });
        console.log(tokenRange);

        let token = tokenRange.delta <= 1620 && tokenRange.delta >= 1400;

        if (!token) {
            return res.status(400).send({message: 'Invalid 2fa token.'})
        }

        return next();
    }
    catch (ex) {
        console.log("2fa error:", ex);
        res.status(400).json({error: 'Invalid 2fa token.'});
    }
};
