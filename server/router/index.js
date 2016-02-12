var express = require('express');
var router = express.Router();
var mongoose = require('../db/mongoose');

router.route('/game/0').post(function (req, res) {
    //var mongoose = require('mongoose');
    //mongoose.connect('mongodb://localhost/test');

    var Cat = mongoose.model('Cat', { name: String });

    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save(function (err) {
        if (err) // ...
            console.log('meow');
    });

    console.log(req.body.checkpoint);
    console.log(new Date());
    console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
    console.log(req.headers['user-agent']);
    res.end(req.header('x-forwarded-for') || req.connection.remoteAddress);
});

router.route('/game/1').post(function (req, res) {
    console.log(req.body.checkpoint);
    console.log(new Date());
    console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
    res.end(req.header('x-forwarded-for') || req.connection.remoteAddress);
});

module.exports = router;