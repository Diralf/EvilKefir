app.service('sprite', ['spriteImage', function (spriteImage) {
    this.create = function (image) {
        return new Sprite(image);
    };

    function Sprite (image) {
        //this.spriteImage = spriteImage.create('╔═╗║ ║║ ║╚═╝', 3, 4);
        this.spriteImage = image || spriteImage.create();

    };

    Sprite.prototype.image = function () {
        return this.spriteImage.image;
    }

    Sprite.prototype.draw = function (context) {

    }
}]);
