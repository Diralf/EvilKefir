(function () {
    'use strict';

    angular
        .module('app')
        .factory('SpriteAnimate', spriteAnimate);

    spriteAnimate.$inject = ['$q', 'Sprite', 'Strip'];

    function spriteAnimate($q, Sprite, Strip) {

        var SpriteAnimate = classSpriteAnimate;
        SpriteAnimate.prototype = Object.create(Sprite.prototype);
        SpriteAnimate.prototype.step = step;
        SpriteAnimate.prototype.changeStrip = changeStrip;
        SpriteAnimate.prototype.revertStrip = revertStrip;
        SpriteAnimate.prototype.collapseArrays = collapseArrays;
        SpriteAnimate.prototype.loadStripSet = loadStripSet;

        return SpriteAnimate;

        //////////////////////////////////////////////////////////

        function classSpriteAnimate(mask) {
            Sprite.call(this, null, mask);

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
                return Strip.load(name);
            })).then(function (linesArray) {
                var stripAwait = new Strip(stripName, self.collapseArrays(linesArray),
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
