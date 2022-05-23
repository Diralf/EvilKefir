(function () {
    'use strict';

    angular
        .module('app')
        .service('viewportService', viewportService);

    //TODO убрать Service в названии

    viewportService.$inject = ['symbolWidthService', 'mapService', 'characterControl', 'point', 'pointLimit'];

    function viewportService(symbolWidthService, mapService, characterControl, point, pointLimit) {
        var self = this;

        this.player = null;
        this.pos = pointLimit.create(0, 0, point.create(0, 0), point.create(500, 500));
        this.dimension = pointLimit.create(80, 30, point.create(0, 0));

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
