var mongoose = require('mongoose');
var config = require('../config');

var connection_string = /*process.env.OPENSHIFT_MONGODB_DB_URL
                     ||*/ "mongodb://user1:qwerty@ds051575.mongolab.com:51575/kefir";

mongoose.connect(connection_string);

module.exports = mongoose;