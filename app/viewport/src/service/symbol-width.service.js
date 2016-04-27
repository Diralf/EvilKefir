(function () {
    'use strict';

    angular
        .module('app')
        .service('symbolWidthService', symbolWidthService);

    //TODO убрать Service в названии

    symbolWidthService.$inject = [];

    function symbolWidthService() {
        var self = this;

        var widthOneSymbol = 0;
        var heightOneSymbol = 0;

        var wcells = 0;
        var hcells = 0;

        var listeners = {
            resize: []
        };

        /*window.onresize = function () {
         listeners.resize.forEach(function (item) {
         item();
         });
         }*/

        this._setSizeOneSymbol = function (width, height, viewWidth, viewHeight) {
            if (width) widthOneSymbol = width;
            if (height) heightOneSymbol = height;

            if (viewWidth) wcells = self.xToSymbolNumber(viewWidth) + 1;
            if (viewHeight) hcells = self.yToSymbolNumber(viewHeight) + 1;

            listeners.resize.forEach(function (item) {
                item();
            });
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

        this.addListener = function (name, callback) {
            listeners[name].push(callback);
        };
    }

})();
