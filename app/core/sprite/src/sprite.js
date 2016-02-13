app.service('sprite', ['spriteImage', function (spriteImage) {
    this.create = function (image) {
        return new this.Sprite(image);
    };

    this.Sprite = function (image) {
        this.spriteImage = image || spriteImage.create();
    };

    this.Sprite.prototype.image = function () {
        return this.spriteImage.image;
    };

    this.Sprite.prototype.draw = function (context) {

    };
}]);
