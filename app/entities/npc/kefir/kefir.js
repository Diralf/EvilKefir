app.service('kefir', ['npc', 'characterSprite', 'game', 'dialogs', 'message',
    function (npc, characterSprite, game, dialogs, message) {
        
    this.Kefir = function (x, y, layer) {
        npc.NPC.call(this, x, y, new characterSprite.CharacterSprite(), layer);

        this.weaponDeath = game.weapons.rose;
        this.isTalked = false;
    };

    this.Kefir.prototype = Object.create(npc.NPC.prototype);

    this.Kefir.prototype.attack = function (params) {
        if (game.currentWeapon.weapon.damage < this.weaponDeath.damage) {
            params.player.handleMessage(message.DEATH, this);
        } else {
            this.handleMessage(message.DEATH, params);
        }

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.Kefir.prototype.look = function (params) {

        game.startDialog(dialogs.kefir.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.Kefir.prototype.talk = function (params) {
        game.startDialog(dialogs.kefir.talk);
        params.player.handleMessage(message.DEATH, this);

        return npc.NPC.prototype.talk.call(this, params);
    };

    this.Kefir.prototype.death = function (params) {
        game.startDialog(dialogs.kefir.death);
        this.die();
        return npc.NPC.prototype.death.call(this, params);
    };
}]);