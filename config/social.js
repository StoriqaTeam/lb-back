const config = require('config');

module.exports = {
    facebookAuth: {
        clientID: '208605113193116',
        clientSecret: 'e4d72c9d60b340de78ddb2c4f59dbb68',
        callbackURL: config.get('back_host')+'auth/facebook/callback',
    },
    twitterAuth: {
        consumerKey: 'bbCijrtvOLOIaw0f7yilbjWyA',
        consumerSecret: 'CTVW4Wb4exlodaea3dYpM7H8V82fLDF0KVCc1wnqszzBwgV3U9',
        callbackURL: config.get('back_host')+'auth/twitter/callback',
    },
    googleAuth: {
        clientID: '836131905097-k989bkib5nu42ksclkqgr05q97g62b33.apps.googleusercontent.com',
        clientSecret: 'xgG-R5wsFOJ_qKR-sTRXzYLS',
        callbackURL: config.get('back_host')+'auth/google/callback',
    },
};
