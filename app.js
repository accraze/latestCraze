/////////IMPORTS///////////////
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var passport = require('passport');
var config = require('./app/config.json');
var db = require('./app/data');
var info = require('./package.json');
var Product = require('./app/models/product');


// database connection
db.startup(config.connection);
  
//////// Express Config ////////////////////////
var env = process.env.Node_ENV || 'development';
if ('development' == env) {
    // Set up jade
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    
    //setup express middleware
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // set up sessions
    app.use(expressSession({
        // session storage
        store: new mongoStore({url:config.connection}),
        // expire after 23 days
        cookie: { maxAge: new Date(Date.now() + 1987200) },
        // session secret from config file
        secret: config.cookie_secret,
        saveUninitialized: true,
        resave: true
        }));
    
    // Set up passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Define public assets
    app.use(express.static(__dirname + '/app/public'));
}
    
// Require router, passing passport for authenticating pages
require('./app/router')(app, passport);

// Listen for requests
app.listen(process.env.PORT ||3000, function() {
    console.log('app is listening on port 3000');
});

module.exports = app;

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});