var request = require('supertest')
  , express = require('express');

var app = require('../app.js');



  describe('Home Page', function() {
  it("renders successfully", function(done) {
    request(app).get('/').expect(200, done);    
  })
})