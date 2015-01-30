var app = require('../app')
  , should = require('should')
  , Product = require('../app/models/product')
  , request = require('supertest');

describe('Product', function () {

 it('should contain a single product after seed.', function (done) {
        Product.find({}, function(err, products) {
        products.length.should.equal(1);
        done();
      });
  });
});