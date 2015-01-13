// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var OrderSchema = new Schema({
    
    
    
});

// Export order model
module.exports = mongoose.model('Order', OrderSchema);