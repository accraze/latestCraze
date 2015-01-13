// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define product schema
var ProductSchema = new Schema({
    
  name: { type: String, required: true },
  description: { type: String, required: true },
  
  featured: { type: Boolean},
  
  pricing: {
    retail: { type: Number, required: true },
    sale: { type: Number},
    cost: { type: Number},
  },
  
  image: [{ type: String}]
  
});

// Export product model
module.exports = mongoose.model('Product', ProductSchema);