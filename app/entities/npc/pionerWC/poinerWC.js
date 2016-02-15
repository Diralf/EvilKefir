app.service('pionerWC', ['npc', 'characterSprite', 'game', 'dialogs',
    function (npc, characterSprite, game, dialogs) {
        
    this.PionerWC = function (x, y, layer) {
        npc.NPC.call(this, x, y, new characterSprite.CharacterSprite(), layer);

        this.isTalked = false;
    };

    this.PionerWC.prototype = Object.create(npc.NPC.prototype);

    this.PionerWC.prototype.attack = function (params) {

        game.startDialog(dialogs.pionerWC.attack);

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.PionerWC.prototype.look = function (params) {

        game.startDialog(dialogs.pionerWC.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.PionerWC.prototype.talk = function (params) {
        if (!this.isTalked) {
            game.startDialog(dialogs.pionerWC.talk);
            this.isTalked = true;
        } else {
            game.startDialog(dialogs.pionerWC.wait);
            this.isTalked = false;
        }

        return npc.NPC.prototype.talk.call(this, params);
    };
}]);