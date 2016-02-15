app.service('horse', ['npc', 'characterSprite', 'game', 'dialogs', 'message', 'npcSprite', 'rect',
    function (npc, characterSprite, game, dialogs, message, npcSprite, rect) {
        
    this.Horse = function (x, y, layer) {
        npc.NPC.call(this, x, y, new npcSprite.NpcSprite(
            {
                path: 'entity/horse/Await_front_left.txt',
                params: {
                    frameCount: 2,
                    dirCount: 1,
                    width: 25,
                    height: 18,
                    centerX: 17,
                    centerY: 17,
                    speed: 0.02
                }
            }, {
                path: 'entity/horse/Death_front_left.txt',
                params: {
                    frameCount: 1,
                    dirCount: 1,
                    width: 25,
                    height: 18,
                    centerX: 17,
                    centerY: 17,
                    speed: 0.02
                }
            }, new rect.Rect(-1, -9, 10, 10)
        ), layer);

        this.weaponDeath = game.weapons.plank;
        this.isTalked = false;
        this.isDead = false;
    };

    this.Horse.prototype = Object.create(npc.NPC.prototype);

    this.Horse.prototype.attack = function (params) {
        if (!this.isDead) {
            if (game.currentWeapon.weapon.damage < this.weaponDeath.damage) {
                params.player.handleMessage(message.DEATH, this);
            } else {
                this.isDead = true;
                this.handleMessage(message.DEATH, params);
            }
        }

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.Horse.prototype.look = function (params) {

        game.startDialog(dialogs.horse.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.Horse.prototype.talk = function (params) {
        if (!this.isDead) {
            game.startDialog(dialogs.horse.talk);
        }
        return npc.NPC.prototype.talk.call(this, params);
    };

    this.Horse.prototype.death = function (params) {
        game.changeWeapon(game.weapons.knife);
        game.startDialog(dialogs.horse.death);
        this.sprite.changeStrip('death');
        return npc.NPC.prototype.death.call(this, params);
    };
}]);