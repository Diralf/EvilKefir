var fs = require("mz/fs");

module.exports = async function loadFile(fileName) {
    try {
        let file = await fs.open(fileName, 'r');
        let stats = await fs.stat(fileName);
        let buffer = new Buffer(stats.size);

        await fs.read(file, buffer, 0, buffer.length, null);
        let data = buffer.toString('utf8', 0, buffer.length);

        console.log("From " + fileName + " loaded " + buffer.length);
        return data;
    } catch (e) {
        console.log("File loading error", e);
        throw e;
    }
};
/*
module.exports = (fileName, callback) => {
    console.log(fs.exists(fileName));
    fs.exists(fileName, exists => {
        if (exists) {
            fs.stat(fileName, (error, stats) => {
                fs.open(fileName, "r", (error, fd) => {
                    let buffer = new Buffer(stats.size);

                    fs.read(fd, buffer, 0, buffer.length, null, (error, bytesRead, buffer) => {
                        let data = buffer.toString("utf8", 0, buffer.length);

                        console.log(fileName + "loaded");

                        callback(data);
                        fs.close(fd);
                    });
                });
            });
        } else {
            console.log('not exists');
        }
    });
};
*/
// module.exports = function (fileName, callback) {
//     fs.exists(fileName, function(exists) {
//         if (exists) {
//             fs.stat(fileName, function(error, stats) {
//                 fs.open(fileName, "r", function(error, fd) {
//                     var buffer = new Buffer(stats.size);

//                     fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
//                         var data = buffer.toString("utf8", 0, buffer.length);

//                         console.log(fileName + "loaded");

//                         callback(data);
//                         fs.close(fd);
//                     });
//                 });
//             });
//         } else {
//             console.log('not exist');
//         }
//     });
// };