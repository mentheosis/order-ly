// app/routes.js
var path = require('path')
var Shipment = require('./models/shipment');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../views/index.html')); // load the index.ejs file
    });

    app.get('/app.css', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../views/css/app.css')); // load the index.ejs file
    });

    app.get('/task-list.html', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../views/task-list.html')); // load the index.ejs file
    });

    app.get('/create-task.html', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../views/create-task.html')); // load the index.ejs file
    });

    app.get('/login.html', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../views/login.html')); // load the index.ejs file
    });

    app.get('/signup.html', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../views/signup.html')); // load the index.ejs file
    });

    app.get('/angular.js', function(req, res) {

        //var angularPath = __dirname+'/../bower_components/angular/angular.js'
        res.sendfile(path.resolve(__dirname,'../bower_components/angular/angular.js')); // load the index.ejs file
        //res.send(angularPath);
    });

    app.get('/app.js', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../app/app.js')); // load the index.ejs file
    });

    app.get('/controller.js', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../app/controller.js')); // load the index.ejs file
    });

    app.get('/angoose-client.js', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../angoose-client-generated.js')); // load the index.ejs file
    });

    app.get('/angular-route.js', function(req, res) {
        res.sendfile(path.resolve(__dirname,'../bower_components/angular-route/angular-route.js')); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('../views/login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SHIP ================================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/ship', authLanding, function(req, res) {
        res.render('ship.ejs', { message: req.flash('shipMessage') });
    });

    app.post('/ship', authLanding, function(req, res) {
        var newShipment = new Shipment();

        newShipment.user = req.user.local.email;
        newShipment.data.weight = req.body.weight;
        newShipment.data.size = req.body.size;
        newShipment.data.pic = req.body.pic;
        newShipment.data.desc = req.body.desc;
        newShipment.data.loc = req.body.loc;
        newShipment.status = req.body.status;

        newShipment.save(function(err) {
            if (err)
                throw err;
        });
        res.redirect('/ship');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function authLanding(req, res, next) {

    // if user is authenticated, redirect to shipping page
    if (!req.isAuthenticated())
        res.redirect('/');

    return next();
}
