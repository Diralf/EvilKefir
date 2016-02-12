var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var router = require('./server/router');

var express = require('express');

var app = express();

app.set('port', port );
app.use(express.static(process.env.OPENSHIFT_REPO_DIR || path.join(__dirname)));

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use('/', router);

var server = http.createServer(app);

server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

console.log("Listening to " + ipaddress + ":" + port + "...");