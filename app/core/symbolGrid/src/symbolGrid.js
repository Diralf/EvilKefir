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
            result[i] = this.data[yInfo.coord + i].substr(xInfo.coord, xInfo.length);
        }

        return result;
    };

    this.SymbolGrid.prototype.initFromText = function (text) {
        return text.split('\n');
    };

    this.SymbolGrid.prototype.init = function (startData) {
        if (typeof startData === 'string') {
            this.data = this.initFromText(startData);
        } else if (typeof startData.length !== 'undefined') {
            this.data = startData;
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
