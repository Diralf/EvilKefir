(function () {
    'use strict';

    angular
        .module('app')
        .factory('EntityVisible', entityVisible);

    entityVisible.$inject = ['$log', 'Entity', 'Sprite', 'collision', 'transparentSymbol', 'Rect'];

    function entityVisible($log, Entity, Sprite, collision, transparentSymbol, Rect) {

        var rectCheckCollision = new Rect(-20, -10, 40, 20);

        var EntityVisible = classEntityVisible;
        EntityVisible.prototype = Object.create(Entity.prototype);
        EntityVisible.prototype.getMaskRect = getMaskRect;
        EntityVisible.prototype.step = step;
        EntityVisible.prototype.draw = draw;
        EntityVisible.prototype.die = die;
        EntityVisible.prototype.moveIn = moveIn;
        EntityVisible.prototype.isPointMeet = isPointMeet;
        EntityVisible.prototype.isMeetingEntity = isMeetingEntity;
        EntityVisible.prototype.checkCollisionEntity = checkCollisionEntity;
        EntityVisible.prototype.checkCollisionMap = checkCollisionMap;

        return EntityVisible;

        ////////////////////////////////////////////////////

        function classEntityVisible(x, y, spr, layer) {
            Entity.apply(this);
            this.sprite = spr || new Sprite();
            this.x = x || 0;
            this.y = y || 0;
            this.layer = layer;
        }

        function getMaskRect(x, y) {
            x = x || this.x;
            y = y || this.y;

            var mask = this.sprite.mask;

            return new Rect(mask.x + x, mask.y + y, mask.w, mask.h);
        }

        function step() {
            Entity.prototype.step.call(this);

            this.sprite.step();
        }

        function draw(context) {
            var image = this.sprite.spriteImage;

            for (var i = 0; i < image.height; i++) {
                for (var j = 0; j < image.width; j++) {
                    var conY = +this.y + i - image.centerY - context.y;
                    var conX = +this.x + j - image.centerX - context.x;
                    var imSym = j + (i * image.width);

                    if (image.image[imSym]!==transparentSymbol &&
                        !(conX < 0 || conY < 0 || conX >= context.w || conY >= context.h)) {
                        context.grid[conY][conX] = image.image[imSym];
                    }
                }
            }
        }

        function die() {
            Entity.prototype.die.call(this);

            this.layer.remove(this.x, this.y);
        }

        function moveIn(x, y) {
            if (!this.layer) {
                $log.error('Layer in entity is not defined');
            }

            if (this.layer && this.layer.moveIn(this.x, this.y, x, y)) {
                return false;
            }

            this.x = x;
            this.y = y;
            return true;
        }

        function isPointMeet(x, y) {
            var image = this.sprite.spriteImage;
            return collision.pointToRect({x: x, y: y}, image.getRect(this.x, this.y));
        }

        function isMeetingEntity(x, y, entity) {
            return collision.rectIntersectRect(this.getMaskRect(x, y), entity.getMaskRect());
        }

        function checkCollisionEntity(x, y, callbackTrue, callbackFalse) {
            var self = this;
            x = x || this.x;
            y = y || this.y;

            this.layer.eachRect(x + rectCheckCollision.x,
                y + rectCheckCollision.y,
                rectCheckCollision.w,
                rectCheckCollision.h,
                function (cx, cy, entity) {
                    if (self.id === entity.id) {
                        return;
                    }

                    if (self.isMeetingEntity(x, y, entity)) {
                        return callbackTrue && callbackTrue(entity);
                    } else {
                        return callbackFalse && callbackFalse(entity);
                    }
                }
            );
        }

        function checkCollisionMap(x, y, map, callbackTrue, callbackFalse) {
            x = x || this.x;
            y = y || this.y;
            var noCollideSymbol = ' ';
            var rcoll = this.getMaskRect(x, y);
            var rectMap = map.getRect(rcoll.x, rcoll.y, rcoll.w, rcoll.h);

            var result = rectMap.some(function (line) {
                return line.some(function (symbol) {
                    return symbol !== noCollideSymbol;
                });
            });

            if (result) {
                return callbackTrue && callbackTrue(rectMap);
            } else {
                return callbackFalse && callbackFalse(rectMap);
            }
        }
    }

})();
