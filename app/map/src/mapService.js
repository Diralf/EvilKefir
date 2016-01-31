app.service("mapService", ["mapData", "collection", function (mapData) {
    var self = this;

    this.init = function () {
        for (var i = 0; i < mapData.height; i++) {
            // that will return {string}
            //mapData.mapLines[i] = new Array(mapData.width + 1).join(" ");
            mapData.mapData.set(i, new Array(mapData.width + 1).join(" "));
        }
    };

    this.getRect = function (x, y, w, h) {
        var result = [];

        for (var i = 0; i < h; i++) {
            //result[i] = mapData.mapLines[y + i].substr(x, w);
            result[i] = mapData.mapData.get(y + i).substr(x, w);
        }

        return result;
    };

}]);
