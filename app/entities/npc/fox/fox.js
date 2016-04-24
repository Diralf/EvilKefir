(function () {
    'use strict';

    angular
        .module('app')
        .service('fox', fox);

    fox.$inject = ['npc', 'characterSprite', 'game', 'dialogs', 'message', 'npcSprite', 'rect'];

    function fox(npc, characterSprite, game, dialogs, message, npcSprite, rect) {

        this.Fox = function (x, y, layer) {
            npc.NPC.call(this, x, y, new npcSprite.NpcSprite(
                {
                    path: 'entity/fox/Await_front_left.txt',
                    params: {
                        frameCount: 2,
                        dirCount: 1,
                        width: 8,
                        height: 3,
                        centerX: 3,
                        centerY: 2,
                        speed: 0.1
                    }
                }, {
                    path: 'entity/fox/Death_front_left.txt',
                    params: {
                        frameCount: 2,
                        dirCount: 1,
                        width: 8,
                        height: 3,
                        centerX: 3,
                        centerY: 2,
                        speed: 0.02
                    }
                }, new rect.Rect(-3, -2, 8, 3)
            ), layer);

            this.weaponDeath = game.weapons.plank;
            this.isTalked = false;
        };

        this.Fox.prototype = Object.create(npc.NPC.prototype);

        this.Fox.prototype.attack = function (params) {
            if (game.currentWeapon.weapon.damage < this.weaponDeath.damage) {
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
    }

})();
