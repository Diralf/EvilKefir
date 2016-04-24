(function () {
    'use strict';

    angular
        .module('app')
        .factory('SpriteImage', spriteImage);

    spriteImage.$inject = ['rect'];

    function spriteImage(rect) {

        var SpriteImage = classSpriteImage;
        SpriteImage.prototype.getRect = getRect;

        return SpriteImage;

        ////////////////////////////////////

        function classSpriteImage (image, width, height, centerX, centerY) {
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
