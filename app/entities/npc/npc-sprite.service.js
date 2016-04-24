(function () {
    'use strict';

    angular
        .module('app')
        .service('npcSprite', npcSprite);

    npcSprite.$inject = ['$q', 'spriteAnimate'];

    function npcSprite($q, spriteAnimate) {

        this.NpcSprite = NpcSprite;
        this.NpcSprite.prototype = Object.create(spriteAnimate.SpriteAnimate.prototype);

        ////////////////////////////////////////

        function NpcSprite(await, death, mask) {
            spriteAnimate.SpriteAnimate.call(this, mask);

            var self = this;

            this.promise = $q.all([
                this.loadStripSet('await',[await.path], await.params),
                this.loadStripSet('death',[death.path], death.params)
            ]).then(function () {
                self.changeStrip('await');
            });
        }
    }

})();
