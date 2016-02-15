app.controller("viewport", function (
    $scope,
    $log,
    character,
    characterData,
    characterControl,
    mouseService,
    mapService,
    viewportService,
    render,
    symbolWidthService,
    entityVisible,
    sprite,
    spriteImage,
    staticObject,
    rect,
    message,
    game,
    pionerWC,
    pionerPark,
    fox,
    horse,
    entity) {

    var mouseHold = false;

    var mouseX = 0;
    var mouseY = 0;

    var player = character.create(20, 30, mapService.currentLevel.layers[0]);
    var pwc = new pionerWC.PionerWC(30, 30, mapService.currentLevel.layers[0]);
    var ppark = new pionerPark.PionerPark(50, 30, mapService.currentLevel.layers[0]);
    var fox1 = new fox.Fox(50, 40, mapService.currentLevel.layers[0]);
    var fox2 = new fox.Fox(60, 40, mapService.currentLevel.layers[0]);
    var hor = new horse.Horse(60, 60, mapService.currentLevel.layers[0]);

    mapService.currentLevel.layers[0].add(player);
    mapService.currentLevel.layers[0].add(pwc);
    mapService.currentLevel.layers[0].add(ppark);
    mapService.currentLevel.layers[0].add(fox1);
    mapService.currentLevel.layers[0].add(fox2);
    mapService.currentLevel.layers[0].add(hor);

    viewportService.player = player;

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY, callback) {
        if (game.nextDialog()) return 0;
        game.onStopPlayer = null;

        var _x = viewportService.pos.x + cellX;
        var _y = viewportService.pos.y + cellY;

        if (game.currentAction != game.actions.move) {

            var mes = game.currentAction.message;

            if (game.currentAction != game.actions.look) {
                game.onStopPlayer = function () {
                    if (calcDistance(player.x / 2, _x / 2, player.y, _y) < 8) {
                        callback(checkAction(_x, _y, mes));
                        game.onStopPlayer = null;
                    }
                };
            } else {
                callback(checkAction(_x, _y, mes))
            }


            if (game.currentAction != game.actions.look && calcDistance(player.x / 2, _x / 2, player.y, _y) > 3) {
                player.handleMessage(message.MOVE, _x, _y);
                mouseHold = true;
            }

            if (game.currentAction != game.actions.attack) {
                game.currentAction = game.actions.move;
                $scope.setActive($scope.buttons[0]);
            }

            return 0;
        }

        mouseHold = true;

        player.handleMessage(message.MOVE, _x, _y);
        //pwc.handleMessage(message.ATTACK);
    });

    function checkAction (_x, _y, mes) {
        var entities = [];
        mapService.getLayers()[0].eachRect(_x - 20, _y - 10, 40, 20, function (x, y, item) {
            entities.unshift(item);
        });

        return entities.some(function (item) {
            return item.isPointMeet(_x, _y)
                && item.handleMessage(mes, {
                    player: player
                });
        });
    }

    function calcDistance(x1, x2, y1, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    mouseService.addMouseHandler("mouseup", function (evt, cellX, cellY, callback) {
        mouseHold = false;
    });

    mouseService.addMouseHandler("mousemove", function (evt, cellX, cellY, callback) {
        mouseX = cellX;
        mouseY = cellY;
    });

    function updatePlayer() {
        if (mouseHold) {
            player.handleMessage(
                message.MOVE,
                viewportService.pos.x + mouseX,
                viewportService.pos.y + mouseY
            );
        }
    }

    symbolWidthService.addListener('resize', function () {
        viewportService.resize();
    });

    $scope.gameviewLine = [];

    viewportService.init("=");
    viewportService.resize();

    player.sprite.promise.then(function () {
       console.log('loaded');
    });

    var timerId = setInterval(function() {
        entity.entityCollection.each(function (key, item) {
            item.step();
        });

        updatePlayer();
        viewportService.update();
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        player.handleMessage('step', game.onStopPlayer);
    }, 60);


    var imageSquare = spriteImage.create('╔══╗║ss║║  ║╚══╝', 4, 4, 1, 3);
    var spriteSquare = sprite.create(imageSquare, new rect.Rect(-1, -1, 4, 2));


    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(40, 20, spriteSquare));
    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(60, 30, spriteSquare));
    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(80, 10, spriteSquare));

    /*setTimeout(function run() {
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        setTimeout(run, 17);
    }, 17);*/



    $scope.buttons = [{
        active: true,
        action: game.actions.move
    },{
        active: false,
        action: game.actions.attack,
        red: true
    },{
        active: false,
        action: game.actions.look
    },{
        active: false,
        action: game.actions.talk
    }];

    var current = $scope.buttons[0];
    $scope.hint = '';

    $scope.setActive = function (button) {
        if (button === current && current !== $scope.buttons[0]) {
            $scope.setActive($scope.buttons[0]);
            return;
        }
        current.active = false;
        button.active = true;
        current = button;

        game.currentAction = button.action;

        $scope.hint = button.action !== game.actions.move ? button.action.title : '';
    };

    $scope.setBorder = function (text) {
        return new Array(text.length+1).join('═');
    };

    $scope.weapon = game.currentWeapon;

    /*{
        border: game.borderWeapon,
        weapon: game.weapon
    };*/

    $scope.dialog = game.dialog;

});
