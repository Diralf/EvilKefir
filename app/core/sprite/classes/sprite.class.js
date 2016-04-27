(function () {
    'use strict';

    angular
        .module('app')
        .factory('Sprite', sprite);

    sprite.$inject = ['SpriteImage', 'Rect'];

    function sprite(SpriteImage, Rect) {

        var Sprite = classSprite;
        Sprite.prototype.image = image;
        Sprite.prototype.step = step;

        return Sprite;

        /////////////////////////////////////////////////////

        function classSprite(image, mask) {
            this.spriteImage = image || new SpriteImage();
            this.mask = mask || new Rect();
        }

        function image() {
            return this.spriteImage.image;
        }

        function step(/*context*/) {

        }
    }

})();

