/////////IMPORTS///////////////
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
// config files
var db = require('./app/data');
var config = require('./app/config.json');
var info = require('./package.json');


// database connection
db.startup(config.connection);
  
//////// Express Config ////////////////////////
var env = process.env.Node_ENV || 'development';
if ('development' == env) {
    // Set up jade
    app.set('views', __dirname + '/shop/views');
    app.set('view engine', 'jade');
    
    //setup express middleware
    app.use(cookieParser());
    app.use(bodyParser());

    // set up sessions
    app.use(expressSession({
        // session storage
        store: new mongoStore({url:config.connection}),
        // expire after 23 days
        cookie: { maxAge: new Date(Date.now() + 1987200) },
        // session secret from config file
        secret: config.cookie_secret
        }));
    
    // Define public assets
    app.use(express.static(__dirname + '/shop/public'));
}
    
// Require router, passing passport for authenticating pages
require('./shop/router')(app, passport);

// Listen for requests
app.listen(3000, function() {
    console.log('app is listening on port 3000');
});


// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});