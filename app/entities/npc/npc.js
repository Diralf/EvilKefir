app.service('npc', ['entityVisible', 'message', function (entityVisible, message) {
    this.NPC = function (x, y, sprite, layer) {
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
    };

    this.NPC.prototype = Object.create(entityVisible.EntityVisible.prototype);

    this.NPC.prototype.attack = function (params) {
        console.log('npc attack');
        return true;
    };

    this.NPC.prototype.look = function (params) {
        return true;
    };

    this.NPC.prototype.talk = function (params) {
        return true;
    };

    this.NPC.prototype.death = function (params) {
        return true;
    };
}]);