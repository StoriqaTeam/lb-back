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
    User.prototype.generateAuthToken = async () => {
        const token = await jwt.sign({User}, config.get('jwtPrivateKey'));
        return token;
    };
    User.prototype.createUser = async (data) => {
        let user = new User(_.pick(data, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.ref_code = crypto.createHash('md5').update(data.email).digest('hex');

        if (data.provider_type) {
            user.provider_type = provider_type;
        }
        if (data.google2fa_secret) {
            user.google2fa_secret = google2fa_secret;
        }
        if (data.ref) {
            let refUser = await User.findOne({where: {ref_code: data.ref}});
            if (refUser) user.ref_id = refUser.id;
        }

        await user.save();
        return user;
    };

    return User;
};