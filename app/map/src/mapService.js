app.service("mapService", ['level', 'entityVisible', 'spriteImage', function (level, entityVisible, spriteImage) {
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


        var imageSquare = spriteImage.create('╔═╗║ ║║ ║╚═╝', 3, 4, 1, 3);
        this.currentLevel.layers[0].add(entityVisible.create(10, 10, imageSquare));

        //this.currentLevel.layers[0].add(character.create(20, 20), 20, 20);
    };

    this.getRect = function (x, y, w, h) {
        return this.currentLevel.tile.getRect(x, y, w, h);
    };

    this.getLayers = function () {
        return this.currentLevel.layers;
    };

}]);
