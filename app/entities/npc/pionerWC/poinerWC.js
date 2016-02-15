app.service('pionerWC', ['npc', 'characterSprite', 'game', 'dialogs', 'npcSprite', 'rect',
    function (npc, characterSprite, game, dialogs, npcSprite, rect) {
        
    this.PionerWC = function (x, y, layer) {
        npc.NPC.call(this, x, y, new npcSprite.NpcSprite(
            {
                path: 'entity/pioner/Await_back_left.txt',
                params: {
                    frameCount: 3,
                    dirCount: 1,
                    width: 7,
                    height: 6,
                    centerX: 3,
                    centerY: 5,
                    speed: 0.1
                }
            }, {
                path: 'entity/pioner/Await_back_left.txt',
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

    this.PionerWC.prototype = Object.create(npc.NPC.prototype);

    this.PionerWC.prototype.attack = function (params) {

        game.startDialog(dialogs.pionerWC.attack);

        return npc.NPC.prototype.attack.call(this, params);
    };

    this.PionerWC.prototype.look = function (params) {

        game.startDialog(dialogs.pionerWC.look);

        return npc.NPC.prototype.look.call(this, params);
    };

    this.PionerWC.prototype.talk = function (params) {
        if (!this.isTalked) {
            game.startDialog(dialogs.pionerWC.talk);
            this.isTalked = true;
        } else {
            game.startDialog(dialogs.pionerWC.wait);
            this.isTalked = false;
        }

        return npc.NPC.prototype.talk.call(this, params);
    };
}]);