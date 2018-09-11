const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models').User;

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({error: 'Access denied. No token provided.'});

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const user = await User.findOne({where: {id: decoded.id}});
    req.user = user;
    next();
  }
  catch (ex) {
    res.status(400).json({error: 'Access denied. Invalid auth token.'});
  }
};