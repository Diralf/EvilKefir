app.service("viewportService", ["symbolWidthService", "mapService", "entityVisible",
    function (symbolWidthService, mapService, entityVisible) {

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
        this.viewport.length = 0;

        var gridSize = symbolWidthService.getGridSize();
        self.wcells = gridSize.wcells ? gridSize.wcells : self.wcells;
        self.hcells = gridSize.hcells ? gridSize.hcells : self.hcells;

        /*var back = mapService.getRect(self.xcells, self.ycells, self.wcells, self.hcells);
        var line
        for (var i = 0; i < this.hcells; i++) {
            line = "";
            for (var j = 0; j < this.wcells; j++) {
                var obj = mapService.getLayers().low.get(j, i);
                line += obj ? obj.sprite.image() : back[i][j];
            }
            this.viewport[i] = line;
        }*/
    };

    this.resize = function () {
        var gridSize = symbolWidthService.getGridSize();
        console.log(gridSize);
        self.wcells = gridSize.wcells ? gridSize.wcells : self.wcells;
        self.hcells = gridSize.hcells ? gridSize.hcells : self.hcells;
    };

}]);
