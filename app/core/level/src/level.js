app.service('level', ['symbolGrid', 'layer', function (symbolGrid, layer) {
    this.create = function (layerCount) {
        return new this.Level(layerCount);
    };

    this.Level = function (layerCount) {
        this.tile = symbolGrid.create();

        this.layers = createLayers(layerCount || 3);
    }

    this.Level.prototype.width = function () {
        return this.tile.width;
    };

    this.Level.prototype.height = function () {
        return this.tile.height;
    };

    function createLayers(layerCount) {
        var layersObj = [];

        for (var i = 0; i < layerCount; i++) {
            layersObj[i] = layer.create();
        }

        return layersObj;
    };

}]);
