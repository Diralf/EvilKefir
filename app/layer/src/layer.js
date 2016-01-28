app.service("layer", ["collection", function (collection) {
    var self = this;

    this.create = function () {
        return new self.Layer();
    };

    this.Layer = function () {
        var selfLayer = this;

        var layerData = collection.create();

        this.add = function (x, y, entity) {
            var line = layerData.get(y);

            if (!line) {
                line = layerData.add(y, collection.create());
            }

            if (line.get(x)) {
                return null;
            }

            return line.add(x, entity);
        }

        this.get = function (x, y) {
            var line = layerData.get(y);

            return line ? line.get(x) : null;
        }

        this.getLayer = function () {
            return layerData;
        };

    };

}]);
