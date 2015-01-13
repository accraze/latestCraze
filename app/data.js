// Require needed modules
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Require data models
var User = require('../app/models/user');
var Product = require('../app/models/product');
var Category = require("../app/models/category");

// Passport methods
passport.use(new LocalStrategy({usernameField: 'email'},function(email, password, done) {User.authenticate(email, password, function(err, user) {return done(err, user)})}));
passport.serializeUser(function(user, done) {done(null, user.id)});
passport.deserializeUser(function(id, done) {User.findById(id, function (err, user) {done(err, user)})});

// Export functions
module.exports = {

    // Connect to database
    startup: function(dbToUse) {
        
        // Connect mongoose and select db
        mongoose.connect(dbToUse);
        
        // Add listener for opened connection
        mongoose.connection.on('open', function() {
            console.log('Connected to database!');
        });
    },

    // Get categories for top nav
  
    // Get featured products
    getFeatured: function(callback) {
        
        // Find products where featured is true
        var query = Product.find({featured : true});
        query.exec(function(err, featuredProducts) { 
            
            // Execute callback
            callback(null, featuredProducts);
        });
    },
  
    // Find product for url
    findProductByName: function(name, callback) {
        var query = Product.findOne({name : name});
        query.exec(function(err, product) {  
            
            // Check if product exists
            if (!product) {
                
                // Pass an error if not
                callback(new Error('Product not found!'));
                
            // Continue if it does
            } else {
            
                // Execute callback
                callback(null, product);
            }
        });
    },
  
    // Find product for ID
    findProductByID: function(id, callback) {
        
        // Find product where _id matches given ID
        var query = Product.findOne({_id : id});
        query.exec(function(err, product) {  
            
            // Execute callback passed from route
            callback(null, product);
        });
    },

    // Save new user
    saveUser: function(userInfo, callback) {
        
        // Build user object
        var newUser = new User ({
            name : { 
                first: userInfo.fname,
                last: userInfo.lname
            },
            
            email: userInfo.email,
            password: userInfo.password
        });
        
        // Save into database
        newUser.save(function(err) {
            if (err) {throw err;}
            
            
            // Execute callback passed from route
            callback(null, newUser);
        });
    },

    // Close DB connection
    closeDB: function() {
        mongoose.disconnect();
    }
};