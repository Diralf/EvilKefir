app.service("viewportService", function (symbolWidthService) {
    var self = this;

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

        for (var i=0; i < self.hcells; i++) {
            self.viewport[i] = [];
            for (var j=0; j < self.wcells; j++) {
                self.viewport[i][j] = symbol;
            }
        }
    };

});
