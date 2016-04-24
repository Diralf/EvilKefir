(function () {
    'use strict';

    angular
        .module('app')
        .service('level', level);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    level.$inject = ['symbolGrid', 'layer'];

    function level(symbolGrid, layer) {
        this.create = create;

        this.Level = Level;
        this.Level.prototype.width = width;
        this.Level.prototype.height = height;

        //////////////////////////////////////////////////////////

        function create(layerCount) {
            return new this.Level(layerCount);
        }

        function Level(layerCount) {
            this.tile = symbolGrid.create();
            this.mask = symbolGrid.create();

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
                layersObj[i] = layer.create();
            }

            return layersObj;
        }

    }
})();
