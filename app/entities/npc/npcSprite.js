app.service('npcSprite', ['$q', 'spriteAnimate', 'strip', 'rect', function ($q, spriteAnimate, strip, rect) {

    this.NpcSprite = function (await, death, mask) {
        spriteAnimate.SpriteAnimate.call(this, mask);

        var self = this;

        this.promise = $q.all([
            this.loadStripSet('await',[await.path], await.params),
            this.loadStripSet('death',[death.path], death.params)
        ]).then(function () {
            self.changeStrip('await');
        });
    };

    this.NpcSprite.prototype = Object.create(spriteAnimate.SpriteAnimate.prototype);
}]);
