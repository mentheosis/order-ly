// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1493599884245969', // your App ID
        'clientSecret'  : 'bb5b3e589fe8e359b5493003f1744fb0', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '266860945680-g846q12r6p8qjam97agr1cce24vfmiji',
        'clientSecret'  : 'N23Az4mKB-dxdCMHtDL6K_pd',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};

