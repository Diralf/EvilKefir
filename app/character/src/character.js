app.service("character", ['entityVisible', 'spriteImage', 'characterControl', 'point', 'characterSprite',
    function (entityVisible, spriteImage, characterControl, point, characterSprite) {

    this.create = function (x, y, layer) {
        return new Character(x, y, layer);
    };

    function Character (x, y, layer) {
        // super call
        entityVisible.EntityVisible.call(this,
                                         x,
                                         y,
                                         new characterSprite.CharacterSprite(),
                                         layer);

        var target = point.create(x, y);
        var isMove = false;

        this.findPath = function () {
            var _x = target.x - this.x;
            var _y = target.y - this.y;

            var resX = _x > 0 ? 1 : ( _x < 0 ? -1 : 0);
            var resY = _y > 0 ? 1 : ( _y < 0 ? -1 : 0);

            return point.create(resX, resY);
        };

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
                this.moveIn(this.x + (res.x), this.y + res.y);
            }
        };
    }

    Character.prototype = Object.create(entityVisible.EntityVisible.prototype);

}]);
