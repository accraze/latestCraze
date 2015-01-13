var db = require("../data");
var config = require("../config.json");
var passport = require('passport');
var stripe = require('stripe')('sk_test_a2zbgWTvWNmVpzJrqs5EitV0');
var nodemailer = require('nodemailer');


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
        var amount = 24000;
     
        stripe.charges.create({
            card: stripeToken,
            currency: 'usd',
            amount: amount
        },

        function(err, charge) {
            if (err) {
                res.send(500, err);
            } else {

                res.render('checkout/orderComplete', {
                    store: config.store.name,
                    title: 'Order Complete',
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: null
                });
                //send email confirmation!

                // create reusable transporter object using SMTP transport
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'lthelatestcraze@gmail.com',
                        pass: 't3stt3st'
                    }
                });

                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: 'The Latest Craze  <latestcraze@blurdybloop.com>', // sender address
                    to: req.user.email, // list of receivers
                    subject: 'Order Confirmation', // Subject line
                    text: 'Thanks for purchasing a widget at The latest craze!', // plaintext body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + info.response);
                    }
                });
            }     
        });

        //clear out cart!
        delete req.session.cart
    },

    //order completed
    orderComplete: function(req, res) {

    }
};