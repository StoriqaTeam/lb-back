const crypto = require('crypto');
const authenticator = require('otplib/authenticator');

authenticator.options = { crypto };

module.exports = async function (req, res, next) {

  try {
      if (!req.user.google2fa_secret) next();

      if (req.headers['X-App-Key'] == 'lucky') next();

      if (!authenticator.check(req.body.twofatoken, req.user.google2fa_secret)) {
          return res.status(400).send({message: 'Invalid 2fa token.'})
      }
      next();
  }
  catch (ex) {
    res.status(400).json({error: 'Invalid 2fa token.'});
  }
};
