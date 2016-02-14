app.service("character", ['entityVisible', 'spriteImage', 'characterControl', 'point', 'characterSprite', 'message', 'mapService',
    function (entityVisible, spriteImage, characterControl, point, characterSprite, message, mapService) {

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

        this.onMessage[message.LOOK] = function () {
            console.log('I also look!!!');
            return true;
        };

        this.onMessage[message.MOVE] = function (type, x, y) {
            if (x % 2) x -= 1;

            if (Math.abs(this.x - x) < 4) x = this.x;
            if (Math.abs(this.y - y) < 2) y = this.y;

            target = point.create(x, y);

            if (this.sprite.currentStrip.name !== 'move') {
                this.sprite.changeStrip('move');
            }
        };

        this.onMessage[message.STEP] = function (type) {
            isMove = target.x != this.x || target.y != this.y;

            if (isMove) {
                var res = findPath.call(this);

                this.sprite.calcDir(res.x, res.y);

                if (res.x || res.y)
                    this.moveIn(this.x + res.x, this.y + res.y);
                else
                    stopMove.call(this);

            } else {
                stopMove.call(this);
            }

            this.sprite.step();
        };

        function findPath () {
            var dir = findDirection.call(this);

            var xycheck = checkCollision.call(this, this.x + dir.x, this.y + dir.y);
            var xcheck;
            var ycheck;

            if (!xycheck) {
                xcheck = checkCollision.call(this, this.x + dir.x, this.y);
                ycheck = checkCollision.call(this, this.x,         this.y + dir.y);

                if (!xcheck) dir.x = 0;
                if (!ycheck) dir.y = 0;
            }

            return dir;
        }

        function findDirection () {
            var _x = target.x - this.x;
            var _y = target.y - this.y;

            var resX = _x > 0 ? 2 : ( _x < 0 ? -2 : 0);
            var resY = _y > 0 ? 1 : ( _y < 0 ? -1 : 0);

            return point.create(resX, resY);
        }

        function stopMove() {
            target.x = this.x;
            target.y = this.y;
            isMove = false;
            this.sprite.changeStrip('await');
        }

        function checkCollision (x, y) {
            var canMove = true;
            this.checkCollisionEntity(
                x, y,
                function (entity) {
                    canMove = false;
                }
            );

            if (canMove) {
                this.checkCollisionMap(
                    x, y, mapService.currentLevel.mask,
                    function () {
                        canMove = false;
                    }
                );
            }

            return canMove;
        }
    }

    Character.prototype = Object.create(entityVisible.EntityVisible.prototype);

}]);
