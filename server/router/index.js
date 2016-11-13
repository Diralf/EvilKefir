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

router.get('/isdesk', function (req, res) {
    console.log(req.device.type);

    res.json(req.device.type);
});

router.route('/game/0').post(function (req, res) {
    var player = new PlayerEnter({
        ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
        date: new Date(),
        checkpoint: req.body.checkpoint.slice(0, 4)
    });

    player.save(function () {
    });

    res.end();
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

router.route('/sprite').post(function (req, res) {
    fileloader("assets/" + req.body.fileName, function (data) {
        res.end(data);
    });
});

module.exports = router;