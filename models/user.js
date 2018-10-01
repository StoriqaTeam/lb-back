'use strict';
const config = require("config");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require("jsonwebtoken");
const models = require("./index");

module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        verification_code: DataTypes.STRING,
        amount: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            validate: {min: 0}
        },
        ref_id: DataTypes.INTEGER,
        ref_code: DataTypes.STRING,
        google2fa_secret: DataTypes.STRING,
        provider_id: DataTypes.STRING,
        provider_type: DataTypes.STRING,
        kyc_applicant_id: DataTypes.STRING,
        kyc_status: DataTypes.INTEGER,
        kyc_comment: DataTypes.STRING
    }, {});
    User.associate = (models) => {
        // associations can be defined here
        User.hasMany(models.Wallet, {as: 'wallets', foreignKey: 'user_id', sourceKey: 'id'});
    };
    User.prototype.generateAuthToken = (data) => {
        //console.log(data.id, data.email);
        const token = jwt.sign(data, config.get('jwtPrivateKey'), {expiresIn: 60 * 120});
        return token;
    };
    User.prototype.checkEmail = async (email) => {
        //console.log(data.id, data.email);
        const user = await User.findOne({where: {email: email}});
        return user;
    };
    // User.hasMany(Wallet, {as: 'wallets', foreignKey: 'user_id', sourceKey: 'id'});
    // User.hook("beforeCreate", function(user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });
    return User;
};