app.service("viewportService", ["symbolWidthService", "mapService", "characterControl", "point", "pointLimit",
    function (symbolWidthService, mapService, characterControl, point, pointLimit) {

    var self = this;

    this.pos = pointLimit.create(0, 0,
                                 point.create(0, 0),
                                 point.create(500, 500));

    this.dimension = pointLimit.create(80, 30, point.create(0, 0));

    this.init = function () {
        /*characterControl.moveHandler(function (rX, rY) {
            //self.safeMoveOn(rX, rY);
            self.pos.moveOn(rX, rY);
        });*/
    };

    this.update = function (symbol) {

    };

    this.resize = function () {
        var gridSize = symbolWidthService.getGridSize();

        this.dimension.moveIn(gridSize.wcells ? gridSize.wcells : this.dimension.x,
                              gridSize.hcells ? gridSize.hcells : this.dimension.y);

        updateMaxBounds();
    };

    function updateMaxBounds () {
        self.pos.pointMax.moveIn(mapService.currentLevel.tile.width - self.dimension.x,
                                 mapService.currentLevel.tile.height - self.dimension.y)
    }

}]);
