var mongoose = require('mongoose');
var config = require('../config');

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/evilkefir';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect('mongodb://' + connection_string);
// 'mongodb://diralf:qwerty@ds041851.mongolab.com:41851/ims'

module.exports = mongoose;