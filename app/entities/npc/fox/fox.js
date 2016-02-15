app.service('fox', ['npc', 'characterSprite', 'game', 'dialogs', 'message',
    function (npc, characterSprite, game, dialogs, message) {
        
    this.Fox = function (x, y, layer) {
        npc.NPC.call(this, x, y, new characterSprite.CharacterSprite(), layer);

        this.weaponDeath = game.weapons.hand;
        this.isTalked = false;
    };

    this.Fox.prototype = Object.create(npc.NPC.prototype);

    this.Fox.prototype.attack = function (params) {
        if (game.weapon.damage < this.weaponDeath.damage) {
            params.player.handleMessage(message.DEATH, this);
        } else {
            this.handleMessage(message.DEATH, params);
        }

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.Fox.prototype.look = function (params) {

        game.startDialog(dialogs.fox.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.Fox.prototype.talk = function (params) {
        params.player.handleMessage(message.DEATH, this);

        return npc.NPC.prototype.talk.call(this, params);
    };

    this.Fox.prototype.death = function (params) {

        this.die();

        return npc.NPC.prototype.death.call(this, params);
    };
}]);