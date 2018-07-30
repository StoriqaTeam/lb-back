const Joi = require('joi');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const _ = require('lodash');
const User = require('../models').User;
const speakeasy = require('speakeasy');
// const userHelper = require('../helpers/user');

module.exports = {
    async signin(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = user.generateAuthToken({id: user.id, email: user.email});
        res.header('x-auth-token', token).send({token: token});
    },
    async signup(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({where: {email: req.body.email}});
        if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.ref_code = crypto.createHash('md5').update(req.body.email).digest('hex');

        if (req.body.ref) {
            let refUser = await User.findOne({where: {ref_code: req.body.ref}});
            if (refUser) user.ref_id = refUser.id;
        }

        await user.save();
        //user = await userHelper.createUser(req.body);

        const token = user.generateAuthToken({id: user.id, email: user.email});
        // res.status(200).send(token);
        res.header('x-auth-token', token)
            .send(_.pick(user, ['id', 'name', 'email', 'ref_code']));
    },
    async google2fa(req, res) {
        let secret = speakeasy.generateSecret({length: 8});
        console.log(secret.base32);
        res.status(200).send({secret:secret.base32});
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

