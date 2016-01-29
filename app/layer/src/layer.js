app.service("layer", ["collection", function (collection) {
    var self = this;

    this.create = function () {
        return new self.Layer();
    };

    this.Layer = function () {
        var selfLayer = this;

        var layerData = collection.create();

        this._data = layerData;

        this.add = function (entity, x, y) {
            if (typeof x === "undefined") {
                if (typeof entity.x === "undefined")
                    throw new Error("Param 'x' is not defined!");
                else x = entity.x;
            }

            if (typeof y === "undefined") {
                if (typeof entity.y === "undefined")
                    throw new Error("Param 'y' is not defined!");
                else y = entity.y;
            }

            var line = layerData.get(y) || layerData.add(y, collection.create());

            return line.get(x) ? null : line.add(x, entity);
        };

        this.get = function (x, y) {
            var line = layerData.get(y);

            return line ? line.get(x) : null;
        };

        this.remove = function (x, y) {
            var line = layerData.get(y);

            return !!(line && line.remove(x));
        };

        this.layerEach = function (callback) {
            var index = 0;
            layerData.each(function (y, line) {
                line.each(function (x, entity) {
                    callback(+x, +y, entity, index, layerData);
                    index++;
                });
            });
        };

        this.moveIn = function (fromX, fromY, toX, toY) {
            var entity = selfLayer.get(fromX, fromY);

            if (!entity) return 2;

            if (selfLayer.add(entity, toX, toY)) {
                selfLayer.remove(fromX, fromY);
                return 0;
            }

            return 1;
        };

        this.moveOn = function (fromX, fromY, onX, onY) {
            return selfLayer.moveIn(fromX, fromY, fromX + onX, fromY + onY);
        };

        this.clear = function () {
            selfLayer.layerEach(function (x, y) {
                selfLayer.remove(x, y);
            });

            layerData.clear();
        };

        this.size = function (y) {
            if (typeof y === 'undefined') {
                return layerData.length();
            }

            var line = layerData.get(y);

            return line ? line.length() : null;
        };

        this.count = function () {
            var count = 0;
            selfLayer.layerEach(function () {
                count++;
            });
            return count;
        };

        this.getLayer = function () {
            return layerData;
        };

    };

}]);
