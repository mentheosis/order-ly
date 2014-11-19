// app/routes.js
var path = require('path')
var Shipment = require('./models/shipment');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', authLanding, function(req, res) {
        res.sendfile('/home/kris/DanPipes/aws/order-ly/views/index.html'); // load the index.ejs file
    });

    app.get('/angular.js', authLanding, function(req, res) {

        //var angularPath = __dirname+'/../bower_components/angular/angular.js'
        res.sendfile('/home/kris/DanPipes/aws/order-ly/bower_components/angular/angular.js'); // load the index.ejs file
        //res.send(angularPath);
    });

    app.get('/controller.js', authLanding, function(req, res) {
        res.sendfile('/home/kris/DanPipes/aws/order-ly/app/controller.js'); // load the index.ejs file
    });

    app.get('/angoose-client.js', authLanding, function(req, res) {
        res.sendfile('/home/kris/DanPipes/aws/order-ly/angoose-client-generated.js'); // load the index.ejs file
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
        successRedirect : '/ship',
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
        successRedirect : '/ship', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SHIP ================================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/ship', isLoggedIn, function(req, res) {
        res.render('ship.ejs', { message: req.flash('shipMessage') });
    });

    app.post('/ship', isLoggedIn, function(req, res) {
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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure a user is logged in
function authLanding(req, res, next) {

    // if user is authenticated, redirect to shipping page
    if (req.isAuthenticated())
        res.redirect('/ship');

    return next();
}
