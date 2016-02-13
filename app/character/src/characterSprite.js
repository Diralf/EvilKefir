app.service('characterSprite', ['$http','sprite', 'spriteImage', 'rect', function ($http, sprite, spriteImage, rect) {
    this.CharacterSprite = function () {
        var image = ' \\\\\\\\\\ ' +
                    '(0 U 0)' +
                    ' ┌-¥-┐ ' +
                    ' |\\_/| ' +
                    '  | |  ' +
                    "  ┘ ┘  ";
        var spriteIm = spriteImage.create(image, 7, 6, 3, 5);

        sprite.Sprite.call(this, spriteIm, new rect.Rect(-3, -5, 7, 6));

        $http.post('/sprite', {fileName: "entity/character/Move_front_left.txt"}).then(function (response) {
            console.log(response.data);
        });
    };

    this.CharacterSprite.prototype = Object.create(sprite.Sprite.prototype);
}]);
