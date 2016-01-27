app.service("mapService", ["mapData", function (mapData) {
    var self = this;

    this.init = function () {
        for (var i = 0; i < mapData.height; i++) {
            // that will return {string}
            mapData.mapLines[i] = new Array(mapData.width + 1).join(" ");
        }
    };

    this.getRect = function (x, y, w, h) {
        var result = [];

        for (var i = 0; i < h; i++) {
            result[i] = mapData.mapLines[i].substr(x, w);
        }

        return result;
    };

}]);
