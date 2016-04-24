(function () {
    'use strict';

    angular
        .module('app')
        .service('npc', npc);

    npc.$inject = ['entityVisible', 'message'];

    function npc(entityVisible, message) {
        this.NPC = NPC;

        this.NPC.prototype = Object.create(entityVisible.EntityVisible.prototype);

        this.NPC.prototype.attack = attack;

        this.NPC.prototype.look = look;

        this.NPC.prototype.talk = talk;

        this.NPC.prototype.death = death;

        /////////////////////////////////////////////////////

        function NPC(x, y, sprite, layer) {
            entityVisible.EntityVisible.call(this, x, y, sprite, layer);

            this.onMessage[message.ATTACK] = function (type, params) {
                console.log('message attack');
                return this.attack(params);
            };

            this.onMessage[message.LOOK] = function (type, params) {
                return this.look(params);
            };

            this.onMessage[message.TALK] = function (type, params) {
                return this.talk(params);
            };

            this.onMessage[message.DEATH] = function (type, params) {
                return this.death(params);
            };
        }

        function attack(/*params*/) {
            console.log('npc attack');
            return true;
        }

        function look(/*params*/) {
            return true;
        }

        function talk(/*params*/) {
            return true;
        }

        function death(/*params*/) {
            return true;
        }
    }

})();
