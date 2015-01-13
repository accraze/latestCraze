var db = require("../data");
var config = require("../config.json");
var passport = require('passport');
var stripe = require('stripe')('sk_test_a2zbgWTvWNmVpzJrqs5EitV0');


// Export functions
module.exports = {
    
    // Display cart
    getCart: function (req,res) {
                res.render('checkout/cart', {
                store: config.store.name,
                title: 'Your Cart',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
            });
    },
    
    // Order form
    getOrder: function (req,res) {
                res.render('checkout/order', {
                store: config.store.name,
                title: 'Your Order',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
            });
    },
    
    // Handle posted order
    postOrder: function(req, res) {
        var stripeToken = req.body.stripeToken;
        var amount = req.body.amount;
     
        stripe.charges.create({
            card: stripeToken,
            currency: 'usd',
            amount: amount
        },
        function(err, charge) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(204);
            }     
        });
    }
};