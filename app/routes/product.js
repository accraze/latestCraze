// Require needed modules
var db = require('../data');
var config = require("../config.json");

// Export functions
module.exports = {

    // Show a product from url request
    getByName: function(req, res) { 
        // Fing requested product
        db.findProductByName(req.params.name, function(err, product) { 
            
            // Catch product not found
            if (err) {
                
                res.render('404', {
                    store: config.store.name,
                    title: err.message,
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: req.session.cart,
                });    
            
            } else {
        
                // Render basic product view
                res.render('product/product', {
                    store: config.store.name,
                    title: product.name,
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: req.session.cart,
                    product: product
                });
            }
        });
    }
};