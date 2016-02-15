app.service('horse', ['npc', 'characterSprite', 'game', 'dialogs', 'message',
    function (npc, characterSprite, game, dialogs, message) {
        
    this.Horse = function (x, y, layer) {
        npc.NPC.call(this, x, y, new characterSprite.CharacterSprite(), layer);

        this.weaponDeath = game.weapons.plank;
        this.isTalked = false;
    };

    this.Horse.prototype = Object.create(npc.NPC.prototype);

    this.Horse.prototype.attack = function (params) {
        if (game.currentWeapon.weapon.damage < this.weaponDeath.damage) {
            params.player.handleMessage(message.DEATH, this);
        } else {
            this.handleMessage(message.DEATH, params);
        }

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.Horse.prototype.look = function (params) {

        game.startDialog(dialogs.horse.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.Horse.prototype.talk = function (params) {
        game.startDialog(dialogs.horse.talk);

        return npc.NPC.prototype.talk.call(this, params);
    };

    this.Horse.prototype.death = function (params) {
        game.changeWeapon(game.weapons.knife);
        game.startDialog(dialogs.horse.death);
        this.die();
        return npc.NPC.prototype.death.call(this, params);
    };
}]);