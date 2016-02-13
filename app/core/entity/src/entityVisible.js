app.service('entityVisible', ['$log', 'entity', 'sprite', 'collision', 'transparentSymbol', function ($log, entity, sprite, collision, transparentSymbol) {
    this.create = function (x, y, image, layer) {
        return new this.EntityVisible(x, y, image, layer);
    };

    this.EntityVisible = function (x, y, image, layer) {
        entity.Entity.apply(this);
        this.sprite = sprite.create(image);
        this.x = x || 0;
        this.y = y || 0;
        this.layer = layer;
    };

    this.EntityVisible.prototype = Object.create(entity.Entity.prototype);

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
        var rect = {
            x: this.x - image.centerX,
            y: this.y - image.centerY,
            w: image.width,
            h: image.height
        };
        console.log(rect);
        return collision.pointToRect({x: x, y: y}, rect);
    }
}]);

