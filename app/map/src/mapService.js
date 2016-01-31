app.service("mapService", ["mapData", function (mapData) {
    var self = this;

    this.init = function () {
        var startArray = [];
        for (var i = 0; i < mapData.height; i++) {
            // that will return {string}
            startArray[i] = new Array(mapData.width + 1).join(".");
        }
        mapData.grid.init(startArray);
    };

    this.getRect = function (x, y, w, h) {
        return mapData.grid.getRect(x, y, w, h);
    };

}]);
