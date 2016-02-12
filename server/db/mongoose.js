var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db.connection['dev']);

module.exports = mongoose;