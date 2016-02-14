app.service('spriteAnimate', ['$q', 'sprite', 'strip', function ($q, sprite, strip) {

    this.SpriteAnimate = function (mask) {
        sprite.Sprite.call(this, null, mask);

        this.frame = 0;
        this.dir = 0;

        this.strips = {};
        this.currentStrip = null;
        this.prevStrip = null;

        this.speed = 0;

    };

    this.SpriteAnimate.prototype = Object.create(sprite.Sprite.prototype);

    this.SpriteAnimate.prototype.step = function () {
        if (!this.currentStrip) return 0;

        var speed = this.currentStrip.speed || this.speed;
        if (this.frame + speed >= this.currentStrip.frameCount - speed) {
            this.frame = 0;
        }
        this.frame += speed;
        this.spriteImage = this.currentStrip.dirframe(this.dir, parseInt(this.frame));
    };

    this.SpriteAnimate.prototype.changeStrip = function (stripName) {
        if (this.strips[stripName]) {
            this.prevStrip = this.currentStrip;
            this.currentStrip = this.strips[stripName];
            this.frame = 0;
        } else {
            console.error('Strip not exists ' + stripName);
        }
    };

    this.SpriteAnimate.prototype.revertStrip = function () {
        this.changeStrip(this.prevStrip.name);
    };

    this.SpriteAnimate.prototype.collapseArrays = function (arrays) {
        var lines = [];

        arrays.forEach(function (array) {
            lines = lines.concat(array);
        });

        return lines;
    };

    this.SpriteAnimate.prototype.loadStripSet = function (stripName, fileNames, properties) {
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

}]);
