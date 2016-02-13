app.service('symbolGrid', ['collection', function (collection) {

    this.create = function () {
        return new this.SymbolGrid();
    };

    this.SymbolGrid = function () {
        this.data = [];
        this.width = 0;
        this.height = 0;
    };

    this.SymbolGrid.prototype.getRect = function (x, y, w, h) {
        var result = [];

        var xInfo = new DimensionInfo(x, w, this.width);

        var yInfo = new DimensionInfo(y, h, this.height);

        fixedParamsRect(xInfo);

        fixedParamsRect(yInfo);

        for (var i = 0; i < yInfo.length; i++) {
            result[i] = this.data[yInfo.coord + i].slice(xInfo.coord, xInfo.coord + xInfo.length);
        }

        return result;
    };

    this.SymbolGrid.prototype.initFromText = function (text) {
        return this.initFromStringArray(text.split('\n'));
    };

    this.SymbolGrid.prototype.initFromStringArray = function (strings) {
        var grid = [];

        strings.forEach(function (line, index) {
            grid[index] = line.split('');
        });

        return grid;
    };

    this.SymbolGrid.prototype.initFromMatrix = function (textMatrix) {
        var mapArray = [];

        textMatrix.forEach(function (line) {
            var chunkArray = []; //[arrayLines, arrayLines, arrayLines]

            line.forEach(function (chunk) {
                chunkArray.push(chunk.split('\n')); // push(arrayLines);
            });

            var linesLine;
            chunkArray.forEach(function (chunkLines) {
                if (!linesLine) {
                    linesLine = chunkLines.map(function (line) {
                        return line.slice(0, -1);
                    });
                } else {
                    chunkLines.forEach(function (line, index) {
                         linesLine[index] += line.slice(0, -1);
                    });
                }
            });

            mapArray = mapArray.concat(linesLine);
        });

        console.log(mapArray);
        this.init(mapArray);
    };

    this.SymbolGrid.prototype.init = function (startData) {
        if (typeof startData === 'string') {
            this.data = this.initFromText(startData);
        } else if (typeof startData.length !== 'undefined') {
            this.data = this.initFromStringArray(startData);
        } else {
            throw new Error("Start data is not correct type (" + typeof startData + ")!");
        }

        var size = calcSize(this.data);
        this.width = size.width;
        this.height = size.height;
    };


    function DimensionInfo(coord, length, size) {
        this.coord = coord;
        this.length = length;
        this.size = size;
    };

    function fixedParamsRect (info) {
        if (info.length < 0) {
            info.coord += info.length + 1;
            info.length = -info.length;
        }

        if (info.coord < 0) {
            info.length += info.coord;
            info.coord = 0;
        }

        if (info.coord + info.length > info.size) {
            info.length = info.size - info.coord;
        }
    };

    function calcSize(data) {
        var width = 0;

        if (data.length > 0) {
            width = data[0].length;

            data.forEach(function (item) {
                if (item.length < width) {
                    width = item.length;
                }
            });
        }

        return {
            width: width,
            height: data.length
        }
    }
}]);
