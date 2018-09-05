const config = require('config');
const User = require('../models').User;
const speakeasy = require('speakeasy');

module.exports = async function (req, res, next) {

  try {
      // let user = await User.findOne({where: {email: req.user.email}});
      if (!req.user.google2fa_secret) next();

      let isVerify = speakeasy.totp.verify({
          secret: req.user.google2fa_secret,
          encoding: 'base32',
          token: req.body.twofatoken
      });
      if (isVerify) {
          next();
      } else {
          res.status(400).send({message: 'Invalid 2fa token.'})
      }
  }
  catch (ex) {
    res.status(400).json({error: 'Invalid 2fa token.'});
  }
};