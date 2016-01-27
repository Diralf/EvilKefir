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

    var s = self.create();

    console.log("layer");
    console.log(s.getLayer().getCollection());

    console.log("add");
    console.log(s.add(4, 5, {name: "fff"}));

    console.log("get added entity");
    console.log(s.get(4, 5));

    console.log("get with wrong x");
    console.log(s.get(1, 5));

    console.log("get with wrong y");
    console.log(s.get(4, 2));

    console.log("layer");
    console.log(s.getLayer().getCollection());

    console.log("add other");
    console.log(s.add(4, 5, {name: "www"}));

    console.log("get old entity");
    console.log(s.get(4, 5));

    console.log("layer");
    console.log(s.getLayer().getCollection());

}]);
