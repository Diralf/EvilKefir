(function () {
    'use strict';

    angular
        .module('app')
        .service('mapService', mapService);

    //TODO убрать Service в названии

    mapService.$inject = ['$http', '$q', 'level'];

    function mapService($http, $q, level) {
        this.levels = [];
        this.currentLevel = null;

        this.init = init;
        this.getRect = getRect;
        this.getLayers = getLayers;

        //////////////////////////////////////////////////////////

        function init() {
            var self = this;
            this.levels.push(level.create());
            this.currentLevel = this.levels[0];

            var startArray = [];
            var i;
            for (i = 0; i < 42 * 3; i++) {
                startArray[i] = new Array(89 * 6).join(' '); // that will return {string}
            }

            this.currentLevel.tile.init(startArray);

            var blankroom = '';
            for (i = 0; i < 40; i++) {
                blankroom += new Array(89).join(' ') + '\n'; // that will return {string}
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
                return $http.post('assets/' + item, {fileName: item});
                //return $http.post('/sprite', {fileName: item});
            })).then(function (maps) {
                var matrix = [
                    [maps[1].data, maps[7].data, maps[6].data, maps[4].data, maps[9].data, maps[9].data],
                    [maps[5].data, maps[8].data, maps[2].data, maps[3].data, maps[0].data, maps[9].data],
                    [maps[9].data, maps[9].data, maps[9].data, maps[9].data, maps[9].data, maps[9].data]
                ];

                self.currentLevel.tile.initFromMatrix(matrix);
                self.currentLevel.mask.initFromMatrix(matrix);
            });
        }

        function getRect(x, y, w, h) {
            return this.currentLevel.tile.getRect(x, y, w, h);
        }

        function getLayers() {
            return this.currentLevel.layers;
        }

    }

})();
