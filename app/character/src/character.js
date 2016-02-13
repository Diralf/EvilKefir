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

        // super call
        entityVisible.EntityVisible.call(this, x, y, sprite);

        var target = point.create(x, y);
        var isMove = false;

        this.layer = layer;

        this.onMessage.look = function () {
            console.log('I also look!!!');
            return true;
        };

        this.onMessage.move = function (type, x, y) {
            target = point.create(x, y);
        };

        this.onMessage.step = function (type) {
            isMove = !(target.x === this.x && target.y === this.y);

            if (isMove) {
                var res = this.findPath();
                this.x += res.x;
                this.y += res.y;
            }
        };

        characterControl.moveHandler(function (rX, rY) {
            if (layer.moveOn(self.x, self.y, rX, rY)) {
                return 0;
            }
            self.x += rX;
            self.y += rY;
        });

        this.findPath = function () {
            var _x = target.x - this.x;
            var _y = target.y - this.y;

            var resX = _x > 0 ? 1 : ( _x < 0 ? -1 : 0);
            var resY = _y > 0 ? 1 : ( _y < 0 ? -1 : 0);

            return point.create(resX, resY);
        }
    }

    Character.prototype = Object.create(entityVisible.EntityVisible.prototype);


}]);
