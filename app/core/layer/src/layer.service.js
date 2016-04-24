(function () {
    'use strict';

    angular
        .module('app')
        .service('layer', layer);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    layer.$inject = ['Collection'];

    function layer(Collection) {

        this.create = create;

        this.Layer = Layer;
        this.Layer.prototype.add = add;
        this.Layer.prototype.get = get;
        this.Layer.prototype.remove = remove;
        this.Layer.prototype.layerEach = layerEach;
        this.Layer.prototype.eachRect = eachRect;
        this.Layer.prototype.moveIn = moveIn;
        this.Layer.prototype.moveOn = moveOn;
        this.Layer.prototype.clear = clear;
        this.Layer.prototype.size = size;
        this.Layer.prototype.count = count;
        this.Layer.prototype.getLayer = getLayer;

        /////////////////////////////////////////////////////

        function create() {
            return new this.Layer();
        }

        function Layer() {
            this._data = new Collection();
        }

        function add(entity, x, y) {
            if (typeof x === 'undefined') {
                if (typeof entity.x === 'undefined'){
                    throw new Error('Param "x" is not defined!');
                }
                else {
                    x = entity.x;
                }
            }

            if (typeof y === 'undefined') {
                if (typeof entity.y === 'undefined') {
                    throw new Error('Param "y" is not defined!');
                }
                else {
                    y = entity.y;
                }
            }

            x = +x;
            y = +y;

            var line = this._data.get(y) || this._data.add(y, new Collection());

            return line.get(x) ? null : line.add(x, entity);
        }

        function get(x, y) {
            var line = this._data.get(y);

            return line ? line.get(x) : null;
        }

        function remove(x, y) {
            var line = this._data.get(y);

            return !!(line && line.remove(x));
        }

        function layerEach(callback) {
            var self = this;
            var index = 0;
            self._data.each(function (y, line) {
                line.each(function (x, entity) {
                    callback(+x, +y, entity, index, self._data);
                    index++;
                });
            });
        }

        function eachRect(x, y, w, h, callback) {
            var self = this;
            var index = 0;
            this._data.eachPart(y, h, function (eY, line) {
                line.eachPart(x, w, function (eX, entity) {
                    callback(+eX, +eY, entity, index, self._data);
                    index++;
                });
            });
        }

        function moveIn(fromX, fromY, toX, toY) {
            var entity = this.get(fromX, fromY);

            if (!entity) {
                return 2;
            }

            if (this.add(entity, toX, toY)) {
                this.remove(fromX, fromY);
                return 0;
            }

            return 1;
        }

        function moveOn(fromX, fromY, onX, onY) {
            return this.moveIn(fromX, fromY, fromX + onX, fromY + onY);
        }

        function clear() {
            var self = this;
            self.layerEach(function (x, y) {
                self.remove(x, y);
            });

            this._data.clear();
        }

        function size(y) {
            if (typeof y === 'undefined') {
                return this._data.length();
            }

            var line = this._data.get(y);

            return line ? line.length() : null;
        }

        function count() {
            var counter = 0;
            this.layerEach(function () {
                counter++;
            });
            return counter;
        }

        function getLayer() {
            return this._data;
        }

    }

})();
