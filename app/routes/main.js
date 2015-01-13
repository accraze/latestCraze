/// IMPORTS ///
var db = require('../data'),
config = require('../config.json');

module.exports = {

    // Get home page
    getHome: function(req, res) {
                    
        // Get featured products
        db.getProducts(function(err, products) { 
            if (err) {console.log(err)}
            
            // get home page
            res.render('main/home', {
                store: config.store.name,
                title: config.store.tagline,
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                products: products
            });
        });
    },

    // Get about page
    getAbout: function(req, res) {         
        // get about page
        res.render('main/about', {
            store: config.store.name,
            title: 'About',
            logged: req.isAuthenticated(),
            user: req.user,
            cart: req.session.cart,
        });
    },
    
    // Get contact page
    getContact: function(req, res) {
            // get contact page
            res.render('main/contact', {
                store: config.store.name,
                title: 'Contact',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart
            });
    },
};