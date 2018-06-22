var fs = require("mz/fs");

module.exports = async function loadFile(fileName) {
    try {
        let [file, stats] = await Promise.all([fs.open(fileName, 'r'), fs.stat(fileName)]);
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