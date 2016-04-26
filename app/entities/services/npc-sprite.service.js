(function () {
    'use strict';

    angular
        .module('app')
        .service('npcSprite', npcSprite);

    npcSprite.$inject = ['$q', 'SpriteAnimate'];

    function npcSprite($q, SpriteAnimate) {

        this.NpcSprite = NpcSprite;
        this.NpcSprite.prototype = Object.create(SpriteAnimate.prototype);

        ////////////////////////////////////////

        function NpcSprite(await, death, mask) {
            SpriteAnimate.call(this, mask);

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
