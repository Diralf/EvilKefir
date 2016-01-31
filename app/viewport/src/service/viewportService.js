app.service("viewportService", ["symbolWidthService", "mapService", "mapData",
    function (symbolWidthService, mapService, mapData) {

    var self = this;

    this.xcells = 0;
    this.ycells = 0;

    this.wcells = 80;
    this.hcells = 30;

    this.viewport = [];

    this.init = function (symbol) {
        self.update(symbol);
    }

    this.update = function (symbol) {
        var gridSize = symbolWidthService.getGridSize();
        self.wcells = gridSize.wcells ? gridSize.wcells : self.wcells;
        self.hcells = gridSize.hcells ? gridSize.hcells : self.hcells;

        var back = mapService.getRect(self.xcells, self.ycells, self.wcells, self.hcells);
        var line
        for (var i = 0; i < this.hcells; i++) {
            line = "";
            for (var j = 0; j < this.wcells; j++) {
                var obj = mapData.layers.low.get(j, i);
                line += obj ? obj : back[i][j];
            }
            this.viewport[i] = line;
        }

        /*self.viewport.length = self.hcells;

        for (var i=0; i < self.hcells; i++) {
            if (!self.viewport[i]) {
                self.viewport[i] = [];
            } else {
                self.viewport[i].lenght = self.wcells;
            }

            for (var j=0; j < self.wcells; j++) {
                self.viewport[i][j] = symbol;
            }
        }*/
    };

    this.resize = function () {

    };

}]);
