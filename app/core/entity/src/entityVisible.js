app.service('entityVisible', ['$log', 'entity', 'sprite', function ($log, entity, sprite) {
    this.create = function (x, y, image) {
        return new EntityVisible(x, y, image);
    }

    function EntityVisible (x, y, image) {
        this.entity = entity.create();
        this.sprite = sprite.create(image);
        this.x = x || 0;
        this.y = y || 0;
    }

    EntityVisible.prototype.draw = function (context) {
        var image = this.sprite.spriteImage;

        for (var i = 0; i < image.height; i++) {
            for (var j = 0; j < image.width; j++) {
                var conY = +this.y + i - image.centerY - context.y;
                var conX = +this.x + j - image.centerX - context.x;
                var imSym = j + (i * image.width);

                if (!(conX < 0 || conY < 0 || conX >= context.w || conY >= context.h)) {
                    context.grid[conY][conX] = image.image[imSym];
                }
            }
        }
    };
}]);
