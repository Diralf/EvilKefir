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
                line = layerData.add(y, collection.create(), true);
            }

            var cell = line.get(x);
        }

        this.get = function (x, y) {
            var line = layerData.get(y);

            return line ? line.get(x) : null;
        }

    };

    var s = self.create();
    console.log(s.get(4, 5));
}]);
