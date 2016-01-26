app.service("viewportService", function () {
    var self = this;

    var widthOneSymbol = 0;
    var heightOneSymbol = 0;

    this.wcells = 80;
    this.hcells = 30;

    this.viewport = [];

    this._setSizeOneSymbol = function (width, height, viewWidth, viewHeight) {
        if (width) widthOneSymbol = width;
        if (height) heightOneSymbol = height;

        if (viewWidth) self.wcells = parseInt(viewWidth / widthOneSymbol);
        if (viewHeight) self.hcells = parseInt(viewHeight / heightOneSymbol);

        self.init("+");
    }

    this.xToSymbolNumber = function (x) {
        return parseInt(x/widthOneSymbol);
    }

    this.xToCellX = function (x) {
        return parseInt(self.xToSymbolNumber(x) * widthOneSymbol);
    }

    this.init = function (symbol) {
        console.log(self.wcells + " " + self.hcells);

        for (var i=0; i < self.hcells; i++) {
            self.viewport[i] = [];
            for (var j=0; j < self.wcells; j++) {
                self.viewport[i][j] = symbol;
            }
        }
    }

});
