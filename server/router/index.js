var express = require('express');
var router = express.Router();
var mongoose = require('../db/mongoose');
var fileloader = require('../fileloader');

var player = mongoose.Schema({
    ip: String,
    date: Date,
    checkpoint: String
});
var PlayerEnter = mongoose.model('PlayerEnter', player);
var PlayerExit = mongoose.model('PlayerExit', player);


router.route('/game/0').post(function (req, res) {
    var player = new PlayerEnter({
        ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
        date: new Date(),
        checkpoint: req.body.checkpoint.slice(0, 4)
    });

    player.save(function () {
    });

    fileloader("assets/map/room1.txt", function (data) {
        res.end(data);
    });
});

router.route('/game/1').post(function (req, res) {
    var player = new PlayerExit({
        ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
        date: new Date(),
        checkpoint: req.body.checkpoint.slice(0, 4)
    });

    player.save(function () {
    });

    res.end();
});

module.exports = router;