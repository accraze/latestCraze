var db = require('../data');
var config = require('../config.json')

module.exports = {

    // Get login modal
    getLogin: function(req, res) {
        res.render('modals/login');
    },

    // Get register modal
    getRegister: function(req, res) {
        res.render('modals/register');
    }
};