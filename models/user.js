'use strict';
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        amount: DataTypes.DOUBLE,
        ref_id: DataTypes.INTEGER,
        ref_code: DataTypes.STRING,
        google2fa_secret: DataTypes.STRING,
        provider_type: DataTypes.STRING
    }, {});
    User.associate = (models) => {
        // associations can be defined here
    };
    User.prototype.generateAuthToken = (data) => {
        //console.log(data.id, data.email);
        const token = jwt.sign(data, config.get('jwtPrivateKey'));
        return token;
    };
    return User;
};