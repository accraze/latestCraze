var request = require('supertest')
  , express = require('express')
  , should = require('should')
  , chai = require('chai');

var app = require('../app.js');

describe('Express Routing', function () {
  describe('Main Routes', function () {
    describe('Home Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/').expect(200, done);    
      })
    })

    describe('About Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/about').expect(200, done);    
      })
    })

    describe('Contact Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/contact').expect(200, done);    
      })
    })
  })


  describe('Modal Routes', function () {
    describe('Register Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/modals/register').expect(200, done);    
      })
    })

    describe('Login Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/modals/login').expect(200, done);    
      })
    })
  })

  describe('Account Routes', function () {
    describe('Account Login', function() {
      it("renders successfully", function(done) {
        request(app).get('/account/login').expect(200, done);    
      })
    })

    describe('Account Home Page', function() {
      it('should not display the account page', function(done){
        request(app)
          .get('/account/home')
          .end(function(err, res){
            should.not.exist(err);
            res.should.have.property('status', 302);
            done();
          })
      });
    })

    describe('Register Account Page', function() {
      it("renders successfully", function(done) {
        request(app)
          .get('/account/register')
          .end(function(err, res){
            should.not.exist(err);
            res.should.have.property('status', 200);
            done();
          }) 
      })
    })

    describe('Account Logout Page', function() {
      it("renders temporarily moved", function(done) {
        request(app)
          .get('/account/logout')
          .end(function(err, res){
            should.not.exist(err);
            res.should.have.property('status', 302);
            done();
          }) 
      })
    })

      describe('New Account Registered Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/account/registered').expect(200, done);    
      })
    })
  })

  describe('Checkout Routes', function () {
    describe('Cart Page', function() {
      it("renders successfully", function(done) {
        request(app).get('/checkout/cart').expect(200, done);    
      })
    })

    describe('Order Page', function() {
      it("renders with empty cart", function(done) {
        request(app).get('/checkout/order').expect(200, done);    
      })
    })
  })
})

