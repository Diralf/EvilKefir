app.service("character", ['entityVisible', 'spriteImage', 'characterControl', function (entityVisible, spriteImage, characterControl) {
    this.create = function (x, y, layer) {
        return new Character(x, y, layer);
    };

    function Character (x, y, layer) {
        var self = this;
        var image = ' ═══ ' +
                    '║* *║' +
                    '║---║' +
                    ' ═══ ';
        var sprite = spriteImage.create(image, 5, 4, 2, 3);

        entityVisible.EntityVisible.call(this, x, y, sprite);

        characterControl.moveHandler(function (rX, rY) {
            if (layer.moveOn(self.x, self.y, rX, rY)) {
                return 0;
            }
            self.x += rX;
            self.y += rY;
        });

        this.layer = layer;
    }

    Character.prototype = Object.create(entityVisible.EntityVisible.prototype);


}]);
