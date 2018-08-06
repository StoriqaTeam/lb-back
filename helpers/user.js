'use strict';
const User = require('../models').User;
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');

module.exports = {
    createUser(data) {
        console.log(data);
        let user = new User(_.pick(data, ['name', 'email', 'password']));
        const salt = bcrypt.genSalt(10);
        user.password = bcrypt.hash(user.password, salt);
        user.ref_code = crypto.createHash('md5').update(data.email).digest('hex');

        if (data.provider_type !== undefined) {
            user.provider_type = provider_type;
        }
        if (data.google2fa_secret !== undefined) {
            user.google2fa_secret = google2fa_secret;
        }
        if (data.ref !== undefined) {
            let refUser = User.findOne({where: {ref_code: data.ref}});
            if (refUser !== undefined) user.ref_id = refUser.id;
        }

        user.save();
        return user;
    },
    getUserInfoBySocialProvider(provider, profile) {
        console.log("prof", profile);
        console.log("provider", provider);

        switch (provider) {
            case 'google':
                return {
                    email: profile.emails[0].value,
                    name: profile.name.givenName + ' ' + profile.name.familyName,
                    avatar: profile.image.url
                };
            case 'twitter':
                return {
                    email: profile.username
                };
            case 'facebook':
                return {
                    email: profile.email ? profile.email.toLowerCase() : '',
                    name: profile.first_name + ' ' + profile.lastName,
                    avatar: profile.picture ? profile.picture : ""
                };
            case 'telegram':
            default:
                return {
                    email: profile.username,
                    name: profile.first_name + ' ' + profile.last_name,
                    avatar: profile.photo_url
                }

        }
    }
};
