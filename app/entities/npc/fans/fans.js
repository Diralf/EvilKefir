(function () {
    'use strict';

    angular
        .module('app')
        .service('fans', fans);

    fans.$inject = ['npc', 'game', 'dialogs', 'message', 'npcSprite', 'Rect'];

    function fans(npc, game, dialogs, message, npcSprite, Rect) {

        this.Fans = function (x, y, layer) {
            npc.NPC.call(this, x, y, new npcSprite.NpcSprite(
                {
                    path: 'entity/fans/Await_front_left.txt',
                    params: {
                        frameCount: 2,
                        dirCount: 1,
                        width: 26,
                        height: 12,
                        centerX: 0,
                        centerY: 0,
                        speed: 0.2
                    }
                }, {
                    path: 'entity/fans/Death_front_left.txt',
                    params: {
                        frameCount: 3,
                        dirCount: 1,
                        width: 26,
                        height: 13,
                        centerX: 0,
                        centerY: 0,
                        speed: 0
                    }
                }, new Rect(0, 0, 26, 12)
            ), layer);

            this.weaponDeath = game.weapons.knife;
            this.isTalked = false;
            this.fansCount = 0;
            this.isDead = false;
        };

        this.Fans.prototype = Object.create(npc.NPC.prototype);

        this.Fans.prototype.attack = function (params) {
            if (!this.isDead){
                if (game.currentWeapon.weapon.damage < this.weaponDeath.damage) {
                    params.player.handleMessage(message.DEATH, this);
                } else {
                    this.sprite.changeStrip('death');
                    this.sprite.frame = this.fansCount;
                    this.fansCount++;
                    if (this.fansCount >= 3) {
                        this.isDead = true;
                        this.handleMessage(message.DEATH, params);
                    }
                }
            }

            return npc.NPC.prototype.attack.call(this, params);
        };

        this.Fans.prototype.look = function (params) {

            game.startDialog(dialogs.fans.look);

            return npc.NPC.prototype.look.call(this, params);
        };

        this.Fans.prototype.talk = function (params) {
            if (!this.isDead) {
                game.startDialog(dialogs.fans.talk);
            }
            return npc.NPC.prototype.talk.call(this, params);
        };

        this.Fans.prototype.death = function (params) {
            game.changeWeapon(game.weapons.rose);
            game.startDialog(dialogs.fans.death);
            //this.die();
            return npc.NPC.prototype.death.call(this, params);
        };
    }

})();
