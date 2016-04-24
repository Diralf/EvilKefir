(function () {
    'use strict';

    angular
        .module('app')
        .service('spriteAnimate', spriteAnimate);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    spriteAnimate.$inject = ['$q', 'sprite', 'strip'];

    function spriteAnimate($q, sprite, strip) {

        this.SpriteAnimate = SpriteAnimate;
        this.SpriteAnimate.prototype = Object.create(sprite.Sprite.prototype);
        this.SpriteAnimate.prototype.step = step;
        this.SpriteAnimate.prototype.changeStrip = changeStrip;
        this.SpriteAnimate.prototype.revertStrip = revertStrip;
        this.SpriteAnimate.prototype.collapseArrays = collapseArrays;
        this.SpriteAnimate.prototype.loadStripSet = loadStripSet;

        //////////////////////////////////////////////////////////

        function SpriteAnimate(mask) {
            sprite.Sprite.call(this, null, mask);

            this.frame = 0;
            this.dir = 0;

            this.strips = {};
            this.currentStrip = null;
            this.prevStrip = null;

            this.speed = 0;

        }

        function step() {
            if (!this.currentStrip) {
                return 0;
            }

            var speed = this.currentStrip.speed || this.speed;
            if (this.frame + speed >= this.currentStrip.frameCount - speed) {
                this.frame = 0;
            }
            this.frame += speed;
            this.spriteImage = this.currentStrip.dirframe(this.dir, parseInt(this.frame));
        }

        function changeStrip(stripName) {
            if (this.strips[stripName]) {
                this.prevStrip = this.currentStrip;
                this.currentStrip = this.strips[stripName];
                this.frame = 0;
            } else {
                console.error('Strip not exists ' + stripName);
            }
        }

        function revertStrip() {
            this.changeStrip(this.prevStrip.name);
        }

        function collapseArrays(arrays) {
            var lines = [];

            arrays.forEach(function (array) {
                lines = lines.concat(array);
            });

            return lines;
        }

        function loadStripSet(stripName, fileNames, properties) {
            var self = this;

            return $q.all(fileNames.map(function (name) {
                return strip.load(name);
            })).then(function (linesArray) {
                var stripAwait = new strip.Strip(stripName, self.collapseArrays(linesArray),
                    properties.frameCount,
                    properties.dirCount,
                    properties.width,
                    properties.height,
                    properties.centerX,
                    properties.centerY);

                stripAwait.speed = properties.speed;

                self.strips[stripName] = stripAwait;
            });
        }
    }

})();
