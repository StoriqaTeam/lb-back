const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models').User;
const userHelper = require('../helpers/user');

module.exports = {
    async signin(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send({token: token});
    },
    async signup(req, res) {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({where: {email: req.body.email}});
        if (user) return res.status(400).send('User already registered.');

        // user = new User(_.pick(req.body, ['name', 'email', 'password']));
        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(user.password, salt);
        // user.ref_code = crypto.createHash('md5').update(req.body.email).digest('hex');
        //
        // if (req.body.ref) {
        //     let refUser = await User.findOne({where: {ref_code: req.body.ref}});
        //     if (refUser) user.ref_id = refUser.id;
        // }
        //
        // await user.save();
        user = await userHelper.createUser(req.body);

        const token = user.generateAuthToken();
        // res.status(200).send(token);
        res.header('x-auth-token', token)
            .send(_.pick(user, ['id', 'name', 'email', 'ref_code']));
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

