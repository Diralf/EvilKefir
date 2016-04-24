(function () {
    'use strict';

    angular
        .module('app')
        .service('sprite', sprite);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    sprite.$inject = ['spriteImage', 'rect'];

    function sprite(spriteImage, rect) {
        this.create = create;

        this.Sprite = Sprite;
        this.Sprite.prototype.image = image;
        this.Sprite.prototype.step = step;

        /////////////////////////////////////////////////////

        function create(image, mask) {
            return new this.Sprite(image, mask);
        }

        function Sprite(image, mask) {
            this.spriteImage = image || spriteImage.create();
            this.mask = mask || new rect.Rect();
        }

        function image() {
            return this.spriteImage.image;
        }

        function step(/*context*/) {

        }
    }

})();

