app.service('sprite', ['spriteImage', 'rect', function (spriteImage, rect) {
    this.create = function (image, mask) {
        return new this.Sprite(image, mask);
    };

    this.Sprite = function (image, mask) {
        this.spriteImage = image || spriteImage.create();
        this.mask = mask || new rect.Rect();
    };

    this.Sprite.prototype.image = function () {
        return this.spriteImage.image;
    };

    this.Sprite.prototype.draw = function (context) {

    };
}]);
