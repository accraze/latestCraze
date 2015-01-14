var request = require('supertest')
  , express = require('express')
  , should = require('should')
  , User = require('../app/models/user');

  var app = require('../app.js');

describe('User Account', function () {
   
   beforeEach(function (done) {
    fakeUser = {
      email: 'TestUser@test.com',
      password: 'TestPassword',
    };
    
    User.remove(done);
  });

  it('should display the user login page', function(done){
      request(app)
        .get('/account/login')
        .expect(200, done);
    });
    it('should be able to access user register page', function(done){
      request(app)
        .get('/account/register')
        .expect(200, done);
    });
    it('should not display the account home page to anonymous user', function(done){
      request(app)
        .get('/account/home')
        .end(function(err, res){
          should.not.exist(err);
          res.should.have.property('status', 302);
          res.header['location'].should.equal('/account/login');
          done();
        })
    });
    it('should register', function (done) {
      request(app)
        .post('/account/register')
        .send(fakeUser)
        .end(function(err, res){
          should.not.exist(err);
          res.should.have.property('status', 302);
          res.header['location'].should.equal('/account/registered');
          done();
        });
    });
})