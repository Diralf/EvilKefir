var fs = require("fs");

module.exports = function (fileName, callback) {
    fs.exists(fileName, function(exists) {
        if (exists) {
            fs.stat(fileName, function(error, stats) {
                fs.open(fileName, "r", function(error, fd) {
                    var buffer = new Buffer(stats.size);

                    fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
                        var data = buffer.toString("utf8", 0, buffer.length);

                        console.log(fileName + "loaded");

                        callback(data);
                        fs.close(fd);
                    });
                });
            });
        } else {
            console.log('not exist');
        }
    });
};