(function () {
    'use strict';

    angular
        .module('app')
        .service('entityVisible', entityVisible);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    entityVisible.$inject = ['$log', 'entity', 'sprite', 'collision', 'transparentSymbol', 'rect'];

    function entityVisible($log, entity, sprite, collision, transparentSymbol, rect) {

        var rectCheckCollision = new rect.Rect(-20, -10, 40, 20);

        this.create = create;

        this.EntityVisible = EntityVisible;
        this.EntityVisible.prototype = Object.create(entity.Entity.prototype);
        this.EntityVisible.prototype.getMaskRect = getMaskRect;
        this.EntityVisible.prototype.step = step;
        this.EntityVisible.prototype.draw = draw;
        this.EntityVisible.prototype.die = die;
        this.EntityVisible.prototype.moveIn = moveIn;
        this.EntityVisible.prototype.isPointMeet = isPointMeet;
        this.EntityVisible.prototype.isMeetingEntity = isMeetingEntity;
        this.EntityVisible.prototype.checkCollisionEntity = checkCollisionEntity;
        this.EntityVisible.prototype.checkCollisionMap = checkCollisionMap;

        ////////////////////////////////////////////////////

        function create(x, y, image, layer) {
            return new this.EntityVisible(x, y, image, layer);
        }

        function EntityVisible(x, y, spr, layer) {
            entity.Entity.apply(this);
            this.sprite = spr || sprite.create();
            this.x = x || 0;
            this.y = y || 0;
            this.layer = layer;
        }

        function getMaskRect(x, y) {
            x = x || this.x;
            y = y || this.y;

            var mask = this.sprite.mask;

            return new rect.Rect(mask.x + x, mask.y + y, mask.w, mask.h);
        }

        function step() {
            entity.Entity.prototype.step.call(this);

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
            entity.Entity.prototype.die.call(this);

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
