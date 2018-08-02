let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let User = require('../models').User;
let socialConfig = require('./social');

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    /*passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            process.nextTick(() => {
                User.findOne({
                    email: email
                }, (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                    } else {
                        let newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save((err) => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            User.findOne({
                'local.email': email
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }

                return done(null, user);
            });
        }
    ));*/

    passport.use(new FacebookStrategy({
            clientID: socialConfig.facebookAuth.clientID,
            clientSecret: socialConfig.facebookAuth.clientSecret,
            callbackURL: socialConfig.facebookAuth.callbackURL,
            profileFields: ['id', 'email', 'first_name', 'last_name'],
        },
        (token, refreshToken, profile, done) => {
            process.nextTick(() => {
                User.findOne(
                    {where: {email: (profile.emails[0].value || '').toLowerCase()}},
                    (err, user) => {

                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, user);

                    } else {
                        let newUser = new User();
                        newUser.provider_type = "facebook";
                        // newUser.facebook.token = token;
                        newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save((err) => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    passport.use(new TwitterStrategy({
            consumerKey: socialConfig.twitterAuth.consumerKey,
            consumerSecret: socialConfig.twitterAuth.consumerSecret,
            callbackURL: socialConfig.twitterAuth.callbackURL,
        },
        (token, tokenSecret, profile, done) => {
        console.log('token', token);
        console.log('tokensec', tokenSecret);
        console.log('profile', profile);
        console.log('done', done);
            process.nextTick(() => {
                User.findOne({where: {'email': profile.username}},
                    function (err, user) {
                    if (err) {
                        return done(err);
                    }
                        console.log("twerr",err);
                        console.log("tw",user);
                    if (user) {
                        return done(null, user);

                    } else {
                        let newUser = new User();
                        newUser.provider_type = "twitter";
                        newUser.email = profile.username;
                        newUser.name = profile.displayName;
                        newUser.save((err) => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    passport.use(new GoogleStrategy({
            clientID: socialConfig.googleAuth.clientID,
            clientSecret: socialConfig.googleAuth.clientSecret,
            callbackURL: socialConfig.googleAuth.callbackURL,
        },
        (token, refreshToken, profile, done) => {
        console.log("token", token);
        console.log("reftoken", refreshToken);
        console.log("profile", profile);
            console.log('done', done);
            process.nextTick(() => {
                // User.findOne({where: {email: profile.emails[0].value}})
                //     .then(user => {
                //         //req.user = user;
                //         if (!user) {
                //             console.log('User Not Found');
                //         }
                //     })
                //     .catch(error => console.log("dsd",error));

                User.findOne({where: {email: profile.emails[0].value}
                }, (err, user) => {
                    console.log("user",user);
                    if (err) {
                        console.log('err1',err);
                        return done(err);
                    }

                    if (user) {
                        console.log(user);
                        return done(null, user);

                    } else {
                        let newUser = new User();
                        newUser.provider_type = "google";
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.save((err) => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
};