app.service('pionerWC', ['npc', 'characterSprite', function (npc, characterSprite) {
    this.PionerWC = function (x, y, layer) {
        npc.NPC.call(this, x, y, new characterSprite.CharacterSprite(), layer);

    };

    this.PionerWC.prototype = Object.create(npc.NPC.prototype);

    this.PionerWC.prototype.attack = function (params) {
        console.log('pionerWC attack');
        return npc.NPC.prototype.attack.call(this, params);
    }
}]);