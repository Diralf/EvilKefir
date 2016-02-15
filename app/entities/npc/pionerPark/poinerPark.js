app.service('pionerPark', ['npc', 'characterSprite', 'game', 'dialogs', 'npcSprite', 'rect',
    function (npc, characterSprite, game, dialogs, npcSprite, rect) {
        
    this.PionerPark = function (x, y, layer) {
        npc.NPC.call(this, x, y, new npcSprite.NpcSprite(
            {
                path: 'entity/pioner/Await_front_left.txt',
                params: {
                    frameCount: 3,
                    dirCount: 1,
                    width: 7,
                    height: 6,
                    centerX: 3,
                    centerY: 5,
                    speed: 0.02
                }
            }, {
                path: 'entity/pioner/Await_front_left.txt',
                params: {
                    frameCount: 3,
                    dirCount: 1,
                    width: 7,
                    height: 6,
                    centerX: 3,
                    centerY: 5,
                    speed: 0.1
                }
            }, new rect.Rect(-2, -1, 5, 2)
        ), layer);

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
            game.changeWeapon(game.weapons.plank);
            this.isTalked = true;
        } else {
            game.startDialog(dialogs.pionerPark.wait);
        }

        return npc.NPC.prototype.talk.call(this, params);
    };
}]);