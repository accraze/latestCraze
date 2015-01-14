var app = require('../app')
  , should = require('should')
  , User = require('../app/models/user')
  , Product = require('../app/models/product')
  , request = require('supertest');

describe('Products', function () {
 it('should allow search by name', function (done) {
        Product.getProductByName({name: 'SWC Album'}, function(err, products) {
        products.length.should.equal(1);
        done();
      });
  });
 it('should contain a single product after seed.', function (done) {
        Product.find({}, function(err, products) {
        products.length.should.equal(1);
        done();
      });
  });
});