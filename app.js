/////////IMPORTS///////////////
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var info = require('./package.json');


/////// Express Config ////////////////////////
var env = process.env.Node_ENV || 'development';
if ('development' == env) {
    // Set up jade
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    
    //setup express middleware
    app.use(cookieParser());
    app.use(bodyParser());
    
    // Define public assets
    app.use(express.static(__dirname + '/app/public'));
}

// Listen for requests
app.listen(3000, function() {
    console.log('app is listening on port 3000');
});


// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});