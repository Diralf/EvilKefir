app.service("symbolWidthService", function () {
    var self = this;

    var widthOneSymbol = 0;
    var heightOneSymbol = 0;

    var wcells = 0;
    var hcells = 0;

    this._setSizeOneSymbol = function (width, height, viewWidth, viewHeight) {
        if (width) widthOneSymbol = width;
        if (height) heightOneSymbol = height;

        if (viewWidth) wcells = self.xToSymbolNumber(viewWidth);
        if (viewHeight) hcells = self.yToSymbolNumber(viewHeight);
    };

    this.xToSymbolNumber = function (x) {
        return parseInt(x/widthOneSymbol);
    };

    this.yToSymbolNumber = function (y) {
        return parseInt(y/heightOneSymbol);
    };

    this.xToCellX = function (x) {
        return parseInt(self.xToSymbolNumber(x) * widthOneSymbol);
    };

    this.yToCellY = function (y) {
        return parseInt(self.yToSymbolNumber(y) * heightOneSymbol);
    };

    this.getGridSize = function () {
        return {
            wcells: wcells,
            hcells: hcells
        }
    };
});
