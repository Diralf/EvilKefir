app.service('sprite', ['$q', '$http', 'spriteImage', 'rect', function ($q, $http, spriteImage, rect) {
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

    this.Sprite.prototype.getTextFromServer = function (cache, fileName) {
        if (!cache) {
            cache = $q.defer();

            $http.post('/sprite', {fileName: fileName}).then(function (response) {
                cache.resolve(response.data);
            });
        }
        return cache;
    };

    this.Sprite.prototype.convertTextToImage = function (text, width) {
        var res = '';

        text.split('\n').forEach(function (part) {
            res += part.slice(0, width);
        });

        return res;
    }
}]);
