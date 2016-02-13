app.service("character", ['entityVisible', 'spriteImage', 'characterControl', 'point',
    function (entityVisible, spriteImage, characterControl, point) {

    this.create = function (x, y, layer) {
        return new Character(x, y, layer);
    };

    function Character (x, y, layer) {
        var self = this;
        var image = ' \\\\\\\\\\ ' +
                    '(0 U 0)' +
                    ' ┌-¥-┐ ' +
                    ' |\\_/| ' +
                    '  | |  ' +
                    "  ┘ ┘  ";
        var sprite = spriteImage.create(image, 7, 6, 3, 5);

        entityVisible.EntityVisible.call(this, x, y, sprite);

        characterControl.moveHandler(function (rX, rY) {
            if (layer.moveOn(self.x, self.y, rX, rY)) {
                return 0;
            }
            self.x += rX;
            self.y += rY;
        });

        this.layer = layer;

        this.onMessage.look = function () {
            console.log('I also look!!!');
            return true;
        };

        this.onMessage.move = function (type, x, y) {
            var target = point.create(x, y);
        }
    }

    Character.prototype = Object.create(entityVisible.EntityVisible.prototype);


}]);
