const passport = require('passport');

module.exports = (app) => {


    require('../config/passport')(passport);

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/',
    }));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/',
    }));

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }),function(req, res) {
        // absolute path
        console.log('google1',req);
        res.redirect('http://localhost:3022/');
    });

    app.get('/auth/google/callback', passport.authenticate('google', {
        // successRedirect: '/profile',
        /// failureRedirect: '/',
    }),  (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
            if (err.name === 'TokenError') {
                console.log("err");
                //console.log(req.profile);
                //res.redirect('/auth/google'); // redirect them back to the login page
            } else {
                // Handle other errors here
            }
        },
        (req, res) => { // On success, redirect back to '/'
            res.redirect('http://localhost:3022/');
        });

    // app.get('/auth/telegram',
    //     passport.authenticate('telegram'),
    //     function(req, res) {
            // The request will be redirected to telepass.me for authentication,
            // so this function will not be called.
        // }
    // );

    app.get('/auth/telegram/callback',
        (req, res) => {
            console.log(req);
            console.log(req.body);
            // Successful authentication, redirect home.
            // res.redirect('/');
        }
    );
};