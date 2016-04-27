(function () {
    'use strict';

    angular
        .module('app')
        .factory('Level', level);

    level.$inject = ['SymbolGrid', 'Layer'];

    function level(SymbolGrid, Layer) {

        var Level = classLevel;
        Level.prototype.width = width;
        Level.prototype.height = height;

        return Level;

        //////////////////////////////////////////////////////////

        function classLevel(layerCount) {
            this.tile = new SymbolGrid();
            this.mask = new SymbolGrid();

            this.layers = createLayers(layerCount || 3);
        }

        function width() {
            return this.tile.width;
        }

        function height() {
            return this.tile.height;
        }

        function createLayers(layerCount) {
            var layersObj = [];

            for (var i = 0; i < layerCount; i++) {
                layersObj[i] = new Layer();
            }

            return layersObj;
        }

    }
})();
