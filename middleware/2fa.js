const config = require('config');
const User = require('../models').User;
const speakeasy = require('speakeasy');

module.exports = async function (req, res, next) {

  try {
      // let user = await User.findOne({where: {email: req.user.email}});
      if (!req.user.google2fa_secret) next();

      if (!authenticator.check(req.body.token, req.body.secret)) {
          return res.status(400).send({message: 'Invalid 2fa token.'})
      }
      next();
  }
  catch (ex) {
    res.status(400).json({error: 'Invalid 2fa token.'});
  }
};