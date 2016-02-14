app.service('characterSprite', ['$http', '$q','sprite', 'spriteImage', 'rect', function ($http, $q, sprite, spriteImage, rect) {
    var spriteCache = null;

    this.CharacterSprite = function () {
        var self = this;
        var width = 7;
        var height = 6;

        var si = spriteImage.create(null, width, height, 3, 5);

        sprite.Sprite.call(this, si, new rect.Rect(-1, 0, 3, 1));

        spriteCache = this.getTextFromServer(spriteCache, "entity/character/Move_front_left.txt");

        this.promise = spriteCache.promise.then(function (text) {
            self.spriteImage.image = self.convertTextToImage(text, width);
        });
    };

    this.CharacterSprite.prototype = Object.create(sprite.Sprite.prototype);
}]);
