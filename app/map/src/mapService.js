app.service("mapService", ['$http', '$q', 'level', 'entityVisible', 'spriteImage', function ($http, $q, level, entityVisible, spriteImage) {
    var self = this;

    this.levels = [];
    this.currentLevel = null;

    this.init = function () {
        var self = this;
        this.levels.push(level.create());
        this.currentLevel = this.levels[0];

        var startArray = [];
        for (var i = 0; i < 42 * 3; i++) {
            startArray[i] = new Array(89 * 5).join(" "); // that will return {string}
        }

        this.currentLevel.tile.init(startArray);

        var blankroom = '';
        for (var i = 0; i < 40; i++) {
            blankroom += new Array(89).join(" ") + '\n'; // that will return {string}
        }

        var maps = [
            'map/tile/8FansRoomNice.txt',
            'map/tile/1FirstRoom.txt',
            'map/tile/6ForestOneRoomNice.txt',
            'map/tile/7ForestSecondRoomNice.txt',
            'map/tile/9LikeRoomNice.txt',
            'map/tile/5RESTORANRoomNice.txt',
            'map/tile/3RestRoomNice.txt',
            'map/tile/2SecondRoom.txt',
            'map/tile/4ThridRoomNice.txt',
            'map/roomSmall.txt'
        ];

        $q.all(maps.map(function (item) {
            return $http.post('/sprite', {fileName: item});
        })).then(function (maps) {
            var matrix = [
                [maps[1].data, maps[7].data, maps[6].data, maps[4].data, maps[9].data],
                [maps[5].data, maps[8].data, maps[2].data, maps[3].data, maps[0].data],
                [maps[9].data, maps[9].data, maps[9].data, maps[9].data, maps[9].data]
            ];

            self.currentLevel.tile.initFromMatrix(matrix);
            self.currentLevel.mask.initFromMatrix(matrix);
        });
    };

    this.getRect = function (x, y, w, h) {
        return this.currentLevel.tile.getRect(x, y, w, h);
    };

    this.getLayers = function () {
        return this.currentLevel.layers;
    };

}]);
