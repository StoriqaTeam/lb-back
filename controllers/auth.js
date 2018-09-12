const Joi = require('joi');
const config = require('config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const _ = require('lodash');
const User = require('../models').User;
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const mailer = require("../helpers/mailer");
const userHelper = require('../helpers/user');
const request = require('request');
const socialConfig = require('../config/social');
const authenticator = require('otplib/authenticator');

authenticator.options = { step: 40 };

module.exports = {
    async signin(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).json({error: error.details[0].message});

        let user = await User.findOne({where: {email: req.body.email}});
        if (!user || !user.password) return res.status(400).json({error: 'Invalid email or password.'});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({error: 'Invalid email or password.'});

        const token = user.generateAuthToken({id: user.id, email: user.email});
        res.header('x-auth-token', token).json({token: token, user: user});
    },
    async signup(req, res) {
        const {error} = validate(req.body);
        console.log(req.body, error);
        if (error) return res.status(400).json(error.details[0].message);

        let user = await User.findOne({where: {email: req.body.email}});
        if (user) return res.status(409).json({error: 'User already registered.'});

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        const activationCode = crypto.createHash('md5').update(req.body.email + salt).digest('hex');

        user.password = await bcrypt.hash(user.password, salt);
        user.ref_code = crypto.createHash('md5').update(req.body.email).digest('hex');
        user.verification_code = activationCode;

        if (req.body.ref) {
            let refUser = await User.findOne({where: {ref_code: req.body.ref}});
            if (refUser) user.ref_id = refUser.id;
        }

        await user.save();
        //user = await userHelper.createUser(req.body);

        const token = user.generateAuthToken({id: user.id, email: user.email});

        await mailer.sendActivation(user.email, activationCode);
        // res.status(200).send(token);
        res.header('x-auth-token', token).json(user);
    },

    async activate(req, res) {
        let user = await User.findOne({where: {verification_code: req.body.code}});
        if (!user) return res.status(400).json({error: 'Invalid activation code.'});

        user.is_verified = true;
        await user.save();

        res.status(200).json({'message': 'User successfull activated'});
    },
    async authSocial(req, res) {
        let data = await userHelper.getUserInfoBySocialProvider(req.body.provider, req.body.profile);

        let user = await User.findOne({where: {email: data.email}});
        if (!user) {
            user = new User({name: data.name, email: data.email});
            user.is_verified = true;
        }
        if (user.name != data.name) {
            user.name = data.name;
        }
        if (user.avatar != data.avatar) {
            user.avatar = data.avatar;
        }
        user.ref_code = !user.ref_code ? crypto.createHash('md5').update(user.email).digest('hex') : user.ref_code;
        user.provider_type = req.body.provider;
        user.provider_id = data.id;
        await user.save();

        const token = user.generateAuthToken({id: user.id, email: user.email});
        return res.header('x-auth-token', token).json({token: token, user: user});
    },

    async authTwitter(req, res, next) {
        console.log("tw", req.query);
        request.post({
            url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
            oauth: {
                consumer_key: socialConfig.twitterAuth.consumerKey,
                consumer_secret: socialConfig.twitterAuth.consumerSecret,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function (err, r, body) {
            if (body == 'Reverse auth credentials are invalid') {
                return res.status(500).json({ message: body });
            }
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            console.log("bstr", bodyString);
            const parsedBody = JSON.parse(bodyString);

            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;

            next();
        });
    },

    async authTwitterReverse(req, res) {
        request.post({
            url: 'https://api.twitter.com/oauth/request_token',
            oauth: {
                oauth_callback: config.get('front_host')+"twitter-callback",
                consumer_key: socialConfig.twitterAuth.consumerKey,
                consumer_secret: socialConfig.twitterAuth.consumerSecret
            }
        }, function (err, r, body) {
            if (err) {
                return res.status(500).json({message: err.message});
            }

            let jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            return res.json(JSON.parse(jsonStr));
        });
    },

    async google2fa(req, res) {
        let secret = authenticator.generateSecret();
        // let secret = speakeasy.generateSecret({length: 8, name: config.get('2fa_name')});
        // let token = speakeasy.totp({
        //     secret: secret.base32,
        //     encoding: 'base32'
        // });
        const otpauth = authenticator.keyuri(req.user.email, config.get('2fa_name'), secret);

        QRCode.toDataURL(otpauth)
            .then(image_data => {
                res.status(200).send({
                    secret: secret,
                    image: image_data,
                });
            });
    },
    async google2fa_enable(req, res) {
        let user = await User.findOne({where: {id: req.user.id}});

        if (!authenticator.check(req.body.token, req.body.secret)) {
            return res.status(400).send({message: 'token not equal'})
        }
        // let isVerify = speakeasy.totp.verify({secret: req.body.secret, encoding: 'base32', token: req.body.token});
        user.google2fa_secret = req.body.secret;
        await user.save();
        return res.status(200).send({message: '2fa enable'});
    },

    async check2fa(req, res) {
        let user = await User.findOne({where: {id: req.body.user_id}});
        let message;
        if (!user.google2fa_secret) return res.status(200).send('not secret ');
        
        const token = authenticator.generate(user.google2fa_secret);
        console.log("usersecret", user.google2fa_secret);
        console.log("token", req.body.token, " = ", token);

        if (authenticator.check(req.body.token, user.google2fa_secret)) {
            console.log("checksuccess");
            message = 'checksuccess';
        } else {
            console.log("checkfail");
            message = 'checkfail';
        }
        const timeUsed = authenticator.timeUsed(),
            timeRemaining = authenticator.timeRemaining();

        return res.status(200).send({message, token, timeUsed, timeRemaining});
    },

    async disable2fa(req, res) {
        await User.update(
            {google2fa_secret: ''},
            {where: {id: req.body.user_id}}
            );

        return res.status(200).send({message: '2fa disabled'});
    }
};

function validate(req) {
    const schema = {
        name: Joi.string().empty(''),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        ref: Joi.string().empty('')
    };

    return Joi.validate(req, schema);
}


