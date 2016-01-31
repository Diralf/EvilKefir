app.service("mapData", ["symbolGrid", "layer", function (symbolGrid, layer) {
    this.tile = symbolGrid.create();
    this.layers = {
        low: layer.create(),
        middle: layer.create(),
        high: layer.create()
    };
}]);
