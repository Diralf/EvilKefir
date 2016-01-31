app.service("mapService", ["mapData", function (mapData) {
    var self = this;

    this.init = function () {
        var startArray = [];
        for (var i = 0; i < 500; i++) {
            // that will return {string}
            startArray[i] = new Array(500 + 1).join(".");
        }
        mapData.tile.init(startArray);
    };

    this.getRect = function (x, y, w, h) {
        return mapData.tile.getRect(x, y, w, h);
    };

    this.getLayers = function () {
        return mapData.layers;
    };

}]);
