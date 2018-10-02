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
    async checkEmail(email) {
        const users = await User.findOne({where: {email: email}});
        return users;
    },
    getUserInfoBySocialProvider(provider, profile) {
        console.log("prof", profile);
        console.log("provider", provider);

        switch (provider) {
            case 'google':
                if (profile.kind !== undefined) {
                    return {
                        email: profile.emails[0].value ? profile.emails[0].value : '',
                        name: profile.name.givenName ? profile.name.givenName : "" + ' ' + profile.name.familyName ? profile.name.familyName : "",
                        avatar: profile.image.url ? profile.image.url : '',
                        id: profile.id
                    };
                } else {
                    return {
                        email: profile.email || '',
                        name: profile.name || "",
                        avatar: profile.picture || profile.image.url || '',
                        id: profile.id
                    };
                }
            case 'twitter':
                return {
                    email: "",
                    id: profile.username
                };
            case 'facebook':
                return {
                    email: profile.email ? profile.email : '',
                    name: profile.first_name ? profile.first_name : "" + ' ' + profile.lastName ? profile.lastName : '',
                    avatar: profile.picture.data.url ? profile.picture.data.url : "",
                    id: profile.id
                };
            case 'telegram':
            default:
                return {
                    email: '',
                    name: profile.first_name ? profile.first_name : "" + ' ' + profile.last_name ? profile.last_name : "",
                    avatar: profile.photo_url ? profile.photo_url : '',
                    id: profile.username
                }

        }
    }
};
