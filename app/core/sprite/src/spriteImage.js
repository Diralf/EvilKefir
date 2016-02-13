app.service('spriteImage', [function () {
    this.create = function (image, width, height, centerX, centerY) {
        return new SpriteImage(image, width, height, centerX, centerY);
    };

    function SpriteImage (image, width, height, centerX, centerY) {
        this.image = image || '$';
        this.width = width || 1;
        this.height = height || 1;
        this.centerX = centerX || 0;
        this.centerY = centerY || 0;
    }
}]);
