(function () {
    'use strict';

    angular
        .module('app')
        .service('kefir', kefir);

    kefir.$inject = ['npc', 'game', 'dialogs', 'message', 'npcSprite', 'rect'];

    function kefir(npc, game, dialogs, message, npcSprite, rect) {

        this.Kefir = function (x, y, layer) {
            npc.NPC.call(this, x, y, new npcSprite.NpcSprite(
                {
                    path: 'entity/kefir/Await_front_left.txt',
                    params: {
                        frameCount: 2,
                        dirCount: 1,
                        width: 37,
                        height: 20,
                        centerX: 18,
                        centerY: 18,
                        speed: 0.1
                    }
                }, {
                    path: 'entity/kefir/Await_front_left.txt',
                    params: {
                        frameCount: 2,
                        dirCount: 1,
                        width: 37,
                        height: 20,
                        centerX: 18,
                        centerY: 18,
                        speed: 0.1
                    }
                }, new rect.Rect(-7, -2, 14, 4)
            ), layer);

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
    }

})();
