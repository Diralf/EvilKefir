app.service('characterSprite', ['sprite', 'spriteImage', function (sprite, spriteImage) {
    this.CharacterSprite = function () {
        var image = ' \\\\\\\\\\ ' +
                    '(0 U 0)' +
                    ' ┌-¥-┐ ' +
                    ' |\\_/| ' +
                    '  | |  ' +
                    "  ┘ ┘  ";
        var spriteIm = spriteImage.create(image, 7, 6, 3, 5);

        sprite.Sprite.call(this, spriteIm);
    };

    this.CharacterSprite.prototype = Object.create(sprite.Sprite.prototype);
}]);
