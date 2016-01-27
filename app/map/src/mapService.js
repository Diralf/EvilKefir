app.service("mapService", ["mapData", function (mapData) {
    var self = this;

    this.init = function () {
        for (var i = 0; i < mapData.height; i++) {
            mapData.mapLines[i] = "";
            for (var j = 0; j < mapData.width; j++) {
                mapData.mapLines[i] += "z";
            }
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
