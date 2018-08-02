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

module.exports = {
    async signin(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).json({error: error.details[0].message});

        let user = await User.findOne({where: {email: req.body.email}});
        if (!user) return res.status(400).json({ error: 'Invalid email or password.'});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.'});

        const token = user.generateAuthToken({id: user.id, email: user.email});
        res.header('x-auth-token', token).send({token: token});
    },
    async signup(req, res) {
        const {error} = validate(req.body);
        console.log(req.body, error)
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({where: {email: req.body.email}});
        if (user) return res.status(409).json({ error: 'User already registered.'});

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        const activationCode = crypto.createHash('md5').update(req.body.email+salt).digest('hex');

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
        res.header('x-auth-token', token)
            .send(_.pick(user, ['id', 'name', 'email', 'ref_code']));
    },

    async activate(req, res) {
        let user = await User.findOne({where: {verification_code: req.body.code}});
        if (!user) return res.status(400).json({ error: 'Invalid activation code.'});

        user.is_verified = true;
        await user.save();

        res.status(200).json({'message': 'User successfull activated'});
    },
    async authSocial(req, res) {
        let data = await userHelper.getUserInfoBySocialProvider(req.body.provider, req.body.profile);

        let user = await User.findOne({where: {email: data.email}});
        if (!user) {
            user = new User({email: data.email});
            user.is_verified = true;
        }

        user.provider_type = req.body.provider;
        await user.save();

        const token = user.generateAuthToken({id: user.id, email: user.email});
        return res.header('x-auth-token', token).json({token: token, user: user});
    },

    async google2fa(req, res) {
        let secret = speakeasy.generateSecret({length: 8, name: config.get('2fa_name')});
        let token = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        QRCode.toDataURL(secret.otpauth_url)
            .then(image_data => {
                res.status(200).send({
                    secret: secret.base32,
                    image: image_data,
                    token: token
                });
            });
    },
    async google2fa_enable(req, res) {
        let user = await User.findOne({where: {email: req.user.email}});
        let isVerify = speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: 'base32',
            token: req.body.token
        });
        if (isVerify) {
            user.google2fa_secret = req.body.secret;
            await user.save();
            res.status(200).send({message: '2fa enable'});
        } else {
            res.status(400).send({message: 'token not equal'})
        }
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


