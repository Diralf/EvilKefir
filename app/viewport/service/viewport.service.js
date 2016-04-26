(function () {
    'use strict';

    angular
        .module('app')
        .service('viewportService', viewportService);

    //TODO убрать Service в названии

    viewportService.$inject = ['symbolWidthService', 'mapService', 'Point', 'PointLimit'];

    function viewportService(symbolWidthService, mapService, Point, PointLimit) {
        var self = this;

        this.player = null;
        this.pos = new PointLimit(0, 0, new Point(0, 0), new Point(500, 500));
        this.dimension = new PointLimit(80, 30, new Point(0, 0));

        this.init = init;
        this.update = update;
        this.resize = resize;

        //////////////////////////////////////////////

        function init() {
            /*characterControl.moveHandler(function (rX, rY) {
             //self.safeMoveOn(rX, rY);
             self.pos.moveOn(rX, rY);
             });*/
        }

        function update() {
            if (this.player) {
                this.pos.moveIn(parseInt(this.player.x - (this.dimension.x / 2)),
                    parseInt(this.player.y - (this.dimension.y / 2)));
            }
        }

        function resize() {
            var gridSize = symbolWidthService.getGridSize();

            this.dimension.moveIn(gridSize.wcells ? gridSize.wcells : this.dimension.x,
                gridSize.hcells ? gridSize.hcells : this.dimension.y);

            updateMaxBounds();
        }

        function updateMaxBounds () {
            self.pos.pointMax.moveIn(mapService.currentLevel.tile.width - self.dimension.x,
                mapService.currentLevel.tile.height - self.dimension.y);
        }

    }

})();
