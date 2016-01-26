app.service("symbolWidthService", function () {
    var self = this;

    var widthOneSymbol = 0;
    var heightOneSymbol = 0;

    var wcells = 0;
    var hcells = 0;

    this._setSizeOneSymbol = function (width, height, viewWidth, viewHeight) {
        if (width) widthOneSymbol = width;
        if (height) heightOneSymbol = height;

        if (viewWidth) wcells = parseInt(viewWidth / widthOneSymbol);
        if (viewHeight) hcells = parseInt(viewHeight / heightOneSymbol);
    }

    this.xToSymbolNumber = function (x) {
        return parseInt(x/widthOneSymbol);
    }

    this.xToCellX = function (x) {
        return parseInt(self.xToSymbolNumber(x) * widthOneSymbol);
    }

    this.getGridSize = function () {
        return {
            wcells: wcells,
            hcells: hcells
        }
    }
});