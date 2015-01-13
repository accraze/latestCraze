var db = require('../data');
var config = require('../config.json');
var passport = require('passport');

module.exports = {
    
    // Handle posted register form
    postRegister: function(req, res) {
    
        // Save user in database
        db.saveUser({
                fname : req.param('name.first'),
                lname : req.param('name.last'),
                email : req.param('email'),
                password : req.param('password')
            }, 
             
            function(err, newUser) {
                if (err) {console.log(err);}
                
                // Set user to user just saved
                req.user = newUser;
                
                // Log in new user with passport
                passport.authenticate('local')(req, res, function () {
                    
                    // Redirect new user to order page
                    res.redirect('/account/registered');
                
                });  
        });
    },
    // Get register page
    getRegister: function(req, res) {
            
            // Render registered page
            res.render('account/register', {
                store: config.store.name,
                title: 'Create an Account',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart
            });
    },
    
    // Get registered page
    getRegistered: function(req, res) {
            
            // Render registered page
            res.render('account/registered', {
                store: config.store.name,
                title: 'Thanks for registering!',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart
            });
    },

    // Get account page
    getAccount: function(req, res) {        
            // Render account page
            res.render('account/account', {
                store: config.store.name,
                title: 'My Account',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart
            });
    },
    // Log user out when account/logout requested
    getLogin: function(req, res){
        
        // Redirect to modal login page
        res.render('account/login');
    
    },

    // Log user out when account/logout requested
    getLogout: function(req, res){
    
        // Passport logout function
        req.logout();
        
        // Redirect to home page
        res.redirect('/');
    
    },
};