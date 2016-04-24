(function () {
    'use strict';

    angular
        .module('app')
        .service('spriteImage', spriteImage);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    spriteImage.$inject = ['rect'];

    function spriteImage(rect) {
        this.create = create;

        this.SpriteImage = SpriteImage;

        this.SpriteImage.prototype.getRect = getRect;

        ////////////////////////////////////

        function create(image, width, height, centerX, centerY) {
            return new SpriteImage(image, width, height, centerX, centerY);
        }

        function SpriteImage (image, width, height, centerX, centerY) {
            this.image = image || '$';
            this.width = width || 1;
            this.height = height || 1;
            this.centerX = centerX || 0;
            this.centerY = centerY || 0;
        }

        function getRect(x, y) {
            x = x || 0;
            y = y || 0;
            return new rect.Rect(x - this.centerX, y - this.centerY, this.width, this.height);
        }
    }
})();
