app.service('pionerPark', ['npc', 'characterSprite', 'game', 'dialogs',
    function (npc, characterSprite, game, dialogs) {
        
    this.PionerPark = function (x, y, layer) {
        npc.NPC.call(this, x, y, new characterSprite.CharacterSprite(), layer);

        this.isTalked = false;
    };

    this.PionerPark.prototype = Object.create(npc.NPC.prototype);

    this.PionerPark.prototype.attack = function (params) {

        game.startDialog(dialogs.pionerPark.attack);

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.PionerPark.prototype.look = function (params) {

        game.startDialog(dialogs.pionerPark.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.PionerPark.prototype.talk = function (params) {
        if (!this.isTalked) {
            game.startDialog(dialogs.pionerPark.talk);
            this.isTalked = true;
        } else {
            game.startDialog(dialogs.pionerPark.wait);
        }

        return npc.NPC.prototype.talk.call(this, params);
    };
}]);