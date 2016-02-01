app.service("layer", ["collection", function (collection) {

    this.create = function () {
        return new this.Layer();
    };

    this.Layer = function () {
        this._data = collection.create();

    };

    this.Layer.prototype.add = function (entity, x, y) {
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

        var line = this._data.get(y) || this._data.add(y, collection.create());

        return line.get(x) ? null : line.add(x, entity);
    };

    this.Layer.prototype.get = function (x, y) {
        var line = this._data.get(y);

        return line ? line.get(x) : null;
    };

    this.Layer.prototype.remove = function (x, y) {
        var line = this._data.get(y);

        return !!(line && line.remove(x));
    };

    this.Layer.prototype.layerEach = function (callback) {
        var self = this;
        var index = 0;
        self._data.each(function (y, line) {
            line.each(function (x, entity) {
                callback(+x, +y, entity, index, self._data);
                index++;
            });
        });
    };

    this.Layer.prototype.eachRect = function (x, y, w, h, callback) {
        var self = this;
        var index = 0;
        this._data.eachPart(y, h, function (eY, line) {
            line.eachPart(x, w, function (eX, entity) {
                callback(+eX, +eY, entity, index, self._data);
                index++;
            });
        });
    };

    this.Layer.prototype.moveIn = function (fromX, fromY, toX, toY) {
        var entity = this.get(fromX, fromY);

        if (!entity) return 2;

        if (this.add(entity, toX, toY)) {
            this.remove(fromX, fromY);
            return 0;
        }

        return 1;
    };

    this.Layer.prototype.moveOn = function (fromX, fromY, onX, onY) {
        return this.moveIn(fromX, fromY, fromX + onX, fromY + onY);
    };

    this.Layer.prototype.clear = function () {
        var self = this;
        self.layerEach(function (x, y) {
            self.remove(x, y);
        });

        this._data.clear();
    };

    this.Layer.prototype.size = function (y) {
        if (typeof y === 'undefined') {
            return this._data.length();
        }

        var line = this._data.get(y);

        return line ? line.length() : null;
    };

    this.Layer.prototype.count = function () {
        var count = 0;
        this.layerEach(function () {
            count++;
        });
        return count;
    };

    this.Layer.prototype.getLayer = function () {
        return this._data;
    };

}]);
