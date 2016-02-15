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
    game) {

    var mouseHold = false;

    var mouseX = 0;
    var mouseY = 0;

    var player = character.create(20, 30, mapService.currentLevel.layers[0]);

    mapService.currentLevel.layers[0].add(
        player,
        20, 30
    );

    viewportService.player = player;

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY, callback) {
        var _x = viewportService.pos.x + cellX;
        var _y = viewportService.pos.y + cellY;
        var entities = [];
        mapService.getLayers()[0].eachRect(_x - 20, _y - 10, 40, 20, function (x, y, entity) {
            entities.unshift(entity);
        });

        callback(entities.some(function (entity) {
            return entity.isPointMeet(_x, _y) && entity.handleMessage(message.LOOK);
        }));

        mouseHold = true;

        player.handleMessage(message.MOVE, _x, _y);
    });

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
        updatePlayer();
        viewportService.update();
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        player.handleMessage('step');
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
        text: game.actions.move,
        active: true
    },{
        text: game.actions.attack,
        active: false
    },{
        text: game.actions.look,
        active: false
    },{
        text: game.actions.talk,
        active: false
    }];

    var current = $scope.buttons[0];
    $scope.hint = '';

    $scope.setActive = function (button) {
        if (button == current) return;
        button.active = true;
        current.active = false;
        current = button;

        game.currentAction = button.text;

        $scope.hint = button.text !== 'Идти' ? button.text : '';
    };

    $scope.setBorder = function (text) {
        return new Array(text.length+1).join('═');
    };


    game.changeWeapon('кулак');

    $scope.weapon = {
        border: game.borderWeapon,
        text: game.weapon
    };


});
