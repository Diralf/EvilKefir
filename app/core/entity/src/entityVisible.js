app.service('entityVisible', ['$log', 'entity', 'sprite', 'collision', 'transparentSymbol', 'rect',
    function ($log, entity, sprite, collision, transparentSymbol, rect) {

    var rectCheckCollision = new rect.Rect(-20, -10, 40, 20);

    this.create = function (x, y, image, layer) {
        return new this.EntityVisible(x, y, image, layer);
    };

    this.EntityVisible = function (x, y, spr, layer) {
        entity.Entity.apply(this);
        this.sprite = spr || sprite.create(image);
        this.x = x || 0;
        this.y = y || 0;
        this.layer = layer;
    };

    this.EntityVisible.prototype = Object.create(entity.Entity.prototype);

    this.EntityVisible.prototype.getMaskRect = function (x, y) {
        x = x || this.x;
        y = y || this.y;

        var mask = this.sprite.mask;

        return new rect.Rect(mask.x + x, mask.y + y, mask.w, mask.h);
    };

    this.EntityVisible.prototype.draw = function (context) {
        var image = this.sprite.spriteImage;

        for (var i = 0; i < image.height; i++) {
            for (var j = 0; j < image.width; j++) {
                var conY = +this.y + i - image.centerY - context.y;
                var conX = +this.x + j - image.centerX - context.x;
                var imSym = j + (i * image.width);

                if (image.image[imSym]!==transparentSymbol && !(conX < 0 || conY < 0 || conX >= context.w || conY >= context.h)) {
                    context.grid[conY][conX] = image.image[imSym];
                }
            }
        }
    };

    this.EntityVisible.prototype.moveIn = function (x, y) {
        if (!this.layer) {
            $log.error('Layer in entity is not defined');
        }

        if (this.layer && this.layer.moveIn(this.x, this.y, x, y)) {
            return false;
        }

        this.x = x;
        this.y = y;
        return true;
    };

    this.EntityVisible.prototype.isPointMeet = function (x, y) {
        var image = this.sprite.spriteImage;
        return collision.pointToRect({x: x, y: y}, image.getRect(this.x, this.y));
    };

    this.EntityVisible.prototype.isMeetingEntity = function (x, y, entity) {
        return collision.rectIntersectRect(this.getMaskRect(x, y), entity.getMaskRect());
    };

    this.EntityVisible.prototype.checkCollisionEntity = function (x, y, callbackTrue, callbackFalse) {
        var self = this;
        x = x || this.x;
        y = y || this.y;

        this.layer.eachRect(x + rectCheckCollision.x,
                            y + rectCheckCollision.y,
                            rectCheckCollision.w,
                            rectCheckCollision.h,
            function (cx, cy, entity) {
                if (self.id == entity.id) return;

                if (self.isMeetingEntity(x, y, entity)) {
                    callbackTrue(entity);
                } else {
                    callbackFalse(entity)
                }
            }
        );
    };

    this.EntityVisible.prototype.checkCollisionMap = function (x, y, map, callbackTrue, callbackFalse) {
        x = x || this.x;
        y = y || this.y;
        var noCollideSymbol = ' ';
        var rcoll = this.getMaskRect(x, y);
        var rectMap = map.getRect(rcoll.x, rcoll.y, rcoll.w, rcoll.h);

        var result = rectMap.some(function (line) {
            return line.some(function (symbol) {
                return symbol != noCollideSymbol;
            })
        });

        if (result)
            callbackTrue && callbackTrue(rectMap);
        else
            callbackFalse && callbackFalse(rectMap);
    };
}]);

