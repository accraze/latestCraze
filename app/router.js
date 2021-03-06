// Require routes
var account = require('./routes/account');
var main = require('./routes/main');
var modals = require('./routes/modals');
var product = require('./routes/product');
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');

// Function to only allow acess if authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // Redirect if not authenticated
    res.redirect('/account/login');
}

// Export routes
module.exports = function(a, p) {

    // Main routes
    a.get('/', main.getHome);
    a.get('/about', main.getAbout);
    a.get('/contact', main.getContact);
    
    // Modal routes
    a.get('/modals/register', modals.getRegister);
    a.get('/modals/login', modals.getLogin);
    
    // Account routes
    a.get('/account/home', ensureAuthenticated, account.getAccount);
    a.get('/account/register', account.getRegister);
    a.post('/account/register', account.postRegister);
    a.get('/account/login', account.getLogin);
    a.get('/account/logout', account.getLogout);
    a.get('/account/registered', account.getRegistered);
    
    // Passport login function
    a.post('/account/login', function(req, res, next) {
        p.authenticate('local', function(err, user, info) {
            if (err){return next(err);} 
            
            // dumb fail
            if (!user) { return res.send({status:"fail"})} 
            
            // login with passport
            req.logIn(user, function(err) { 
                if (err){return next(err);} 
                
                    // Redirect to homepage
                    return res.redirect('/');
                });
        })(req, res, next);
    });
    
    // Product
    a.get('/product/:name', product.getByName);
    
    // Cart
    a.post('/cart/add/:id', cart.addProduct);
    a.post('/cart/rem/:id', cart.remProduct);
    
    // Checkout
    a.get('/checkout/cart', checkout.getCart);
    a.get('/checkout/order', checkout.getOrder);
    a.post('/checkout/order', checkout.postOrder);
    
};