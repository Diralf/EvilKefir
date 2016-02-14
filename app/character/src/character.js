app.service("character", ['entityVisible', 'spriteImage', 'characterControl', 'point', 'characterSprite', 'message',
    function (entityVisible, spriteImage, characterControl, point, characterSprite, message) {

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

        this.onMessage[message.LOOK] = function () {
            console.log('I also look!!!');
            return true;
        };

        this.onMessage[message.MOVE] = function (type, x, y) {
            if (x % 2) x -= 1;
            target = point.create(x, y);
        };

        this.onMessage[message.STEP] = function (type) {
            isMove = !(target.x === this.x && target.y === this.y);

            if (isMove) {
                var res = this.findPath();
                var nx = this.x + (res.x*2);
                var ny = this.y + res.y;
                var canMove = true;

                this.checkCollisionEntity(
                    nx, ny,
                    function (entity) {
                        console.log(entity.id + " meeted");
                        canMove = false;
                    },
                    function (entity) {
                        console.log(entity.id);
                    }
                );

                if (canMove) this.moveIn(nx, ny);
            } else {
                target.x = this.x;
                target.y = this.y;
            }


        };
    }

    Character.prototype = Object.create(entityVisible.EntityVisible.prototype);

}]);
