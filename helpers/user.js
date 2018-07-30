'use strict';
const User = require('../models').User;
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');

module.exports = {
    async createUser(data) {
        console.log(data);
        let user = new User(_.pick(data, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.ref_code = crypto.createHash('md5').update(data.email).digest('hex');

        if (data.provider_type!==undefined) {
            user.provider_type = provider_type;
        }
        if (data.google2fa_secret!==undefined) {
            user.google2fa_secret = google2fa_secret;
        }
        if (data.ref!==undefined) {
            let refUser = await User.findOne({where: {ref_code: data.ref}});
            if (refUser!==undefined) user.ref_id = refUser.id;
        }

        await user.save();
        return user;
    }
};