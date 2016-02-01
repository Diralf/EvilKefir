app.service("mapService", ['level', 'entityVisible', function (level, entityVisible) {
    var self = this;

    this.levels = [];
    this.currentLevel = null;

    this.init = function () {
        this.levels.push(level.create());
        this.currentLevel = this.levels[0];

        var startArray = [];
        for (var i = 0; i < 500; i++) {
            startArray[i] = new Array(500 + 1).join("."); // that will return {string}
        }

        this.currentLevel.tile.init(startArray);

        this.currentLevel.layers[0].add(entityVisible.create(10, 10));
    };

    this.getRect = function (x, y, w, h) {
        return this.currentLevel.tile.getRect(x, y, w, h);
    };

    this.getLayers = function () {
        return this.currentLevel.layers;
    };

}]);
