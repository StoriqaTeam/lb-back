'use strict';
const config = require("config");
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
    User.prototype.generateAuthToken = () => {
        const token = jwt.sign({id: this.id}, config.get('jwtPrivateKey'));
        return token;
    };
    return User;
};