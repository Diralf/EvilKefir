app.service("viewportService", ["symbolWidthService", "mapService", "entityVisible", "characterControl",
    function (symbolWidthService, mapService, entityVisible, characterControl) {

    var self = this;

    this.xcells = 0;
    this.ycells = 0;

    this.wcells = 80;
    this.hcells = 30;

    this.init = function () {
        characterControl.moveHandler(function (rX, rY) {
            self.safeMoveOn(rX, rY);
        });
    }

    this.update = function (symbol) {

    };

    this.resize = function () {
        var gridSize = symbolWidthService.getGridSize();
        self.wcells = gridSize.wcells ? gridSize.wcells : self.wcells;
        self.hcells = gridSize.hcells ? gridSize.hcells : self.hcells;
    };

    this.moveIn = function (x, y) {
        actionMove({x: x, y: y});
    };

    this.moveOn = function (x, y) {
        var point = decoratorRelativeMove({x: x, y: y});
        actionMove(point);
    };

    this.safeMoveIn = function (x, y) {
        var point = decoratorSafePoint({x: x, y: y});
        point = decoratorSafeBounds(point);
        actionMove(point);
    };

    this.safeMoveOn = function (x, y) {
        var point = decoratorRelativeMove({x: x, y: y});
        point = decoratorSafePoint(point);
        point = decoratorSafeBounds(point);
        actionMove(point);
    }

    /**
     * decorator for relative coordinates
     */
    function decoratorRelativeMove (point) {
        point.x = self.xcells + point.x;
        point.y = self.ycells + point.y;
        return point;
    }

    /**
     * decorator для остановки вьюпорта если он выходит за top-left края
     */
    function decoratorSafePoint (point) {
        if (point.x < 0) point.x = 0;
        if (point.y < 0) point.y = 0;
        return point;
    }

    /**
     * decorator для остановки вьюпорта если он выходит за bottom-rigth края
     */
    function decoratorSafeBounds (point) {
        var xBound = mapService.currentLevel.tile.width - self.wcells;
        var yBound = mapService.currentLevel.tile.height - self.hcells;


        if (point.x > xBound) point.x = xBound;
        if (point.y > yBound) point.y = yBound;

        return point;
    }

    function actionMove (point) {
        self.xcells = point.x;
        self.ycells = point.y;
        return point;
    }

}]);
