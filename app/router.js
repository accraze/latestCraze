// Require routes
var account = require('./routes/account');
var main = require('./routes/main');
var modals = require('./routes/modals');
var product = require('./routes/product');
var cart = require('./routes/cart');
var category = require('./routes/category');
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
    
};