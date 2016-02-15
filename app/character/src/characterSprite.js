app.service('characterSprite', ['$q', 'spriteAnimate', 'strip', 'rect', function ($q, spriteAnimate, strip, rect) {

    this.CharacterSprite = function () {
        spriteAnimate.SpriteAnimate.call(this, new rect.Rect(-2, -1, 5, 2));

        var self = this;

        this.promise = this.loadStripSet('await',[
            "entity/character/await/Await_back_left.txt",
            "entity/character/await/Await_back_right.txt",
            "entity/character/await/Await_front_left.txt",
            "entity/character/await/Await_front_right.txt"
        ], {
            frameCount: 3,
            dirCount: 4,
            width: 7,
            height: 6,
            centerX: 3,
            centerY: 5,
            speed: 0
        }).then(function () {
            self.changeStrip('await');
        });

        this.loadStripSet('move',[
            "entity/character/move/Move_back_left.txt",
            "entity/character/move/Move_back_right.txt",
            "entity/character/move/Move_front_left.txt",
            "entity/character/move/Move_front_right.txt"
        ], {
            frameCount: 2,
            dirCount: 4,
            width: 7,
            height: 6,
            centerX: 3,
            centerY: 5,
            speed: 0.2
        });

        this.dir = 3;

    };

    this.CharacterSprite.prototype = Object.create(spriteAnimate.SpriteAnimate.prototype);

    this.CharacterSprite.prototype.calcDir = function (x, y) {
        var matrix = {
            '-1': {
                '-2': 0,
                '0': this.dir % 2 ? 1 : 0,
                '2': 1
            },
            '0': {
                '-2': this.dir < 2 ? 0 : 2,
                '0': this.dir,
                '2': this.dir < 2 ? 1 : 3
            },
            '1': {
                '-2': 2,
                '0': this.dir % 2 ? 3 : 2,
                '2': 3
            }
        };
        this.dir = matrix[y+''][x+''];
    }
}]);
