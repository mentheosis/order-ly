// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../app/models/user');
var configAuth = require('./auth');


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    passport.use(facebookStrategy);
    passport.use(googleStrategy);
};

var localSignupOptions = {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback,
    };

var localSignupStrategy = new LocalStrategy(localSignupOptions, function(req, email, password, done) {

    process.nextTick(function() {
		User.findOne({ 'local.email' :  email }, function(err, user) {
			if (err) { return done(err); }
			if (user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {
				var newUser = new User();
				newUser.local.email    = email;
				newUser.local.password = newUser.generateHash(password);
				newUser.save(function(err) {
					if (err)
						throw err;
					return done(null, newUser);
				});
			}
        });
    });
});

var localLoginOptions = {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    };

var localLoginStrategy = new LocalStrategy(localLoginOptions, function(req, email, password, done) {

    User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) { return done(err); }

        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        return done(null, user);
    });
});

var facebookOptions = {

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
    };

var facebookStrategy = new FacebookStrategy(facebookOptions, function(token, refreshToken, profile, done){

    process.nextTick(function() {
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
            if (err) { return done(err); }

            if (user) {
                return done(null, user); // existing user
            } else {
                //new user
                var newUser = new User();

                newUser.facebook.id  = profile.id;                  
                newUser.facebook.token = token;                  
                newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.facebook.email = profile.emails[0].value;

                newUser.save(function(err) {
                    if (err) { throw err; }

                    return done(null, newUser);
                });
            }
        });
    });
});

var googleOptions = {
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    };

var googleStrategy = new GoogleStrategy(googleOptions, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            if (err) { return done(err); }

            if (user) {
                return done(null, user);
            } else {
                var newUser = new User();
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;

                newUser.save(function(err) {
                    if (err) { throw err; }
                    return done(null, newUser);
                });
            }
        });
    });
});




