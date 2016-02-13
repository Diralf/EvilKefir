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
    rect) {

    /*characterControl.moveHandler( function (relX, relY) {

        if (!mapService.getLayers()[0].moveOn(characterData.x, characterData.y, relX, relY)) {
            characterData.x += relX;
            characterData.y += relY;
        }

        $scope.$apply();
        update();
    });*/

    /*mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY) {
        var imageSquare = spriteImage.create('╔══╗║  ║║  ║╚══╝', 4, 4, 1, 3);

        mapService.getLayers()[0].add(
            entityVisible.create(
                viewportService.pos.x + cellX,
                viewportService.pos.y + cellY,
                imageSquare
            )
        );
    });*/

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY, callback) {
        var _x = viewportService.pos.x + cellX;
        var _y = viewportService.pos.y + cellY;
        var entities = [];
        mapService.getLayers()[0].eachRect(_x - 20, _y - 10, 40, 20, function (x, y, entity) {
            entities.unshift(entity);
        });

        callback(entities.some(function (entity) {
            return entity.isPointMeet(_x, _y) && entity.handleMessage('look');
        }));

        player.handleMessage('move', _x, _y);
    });

    function update() {
        //$scope.gameviewLine = render.draw();
    }

    symbolWidthService.addListener('resize', function () {
        viewportService.resize();
        //$scope.gameviewLine = render.draw();
    });

    $scope.gameviewLine = [];

    viewportService.init("=");

    //viewportService.viewport[characterData.y][characterData.x] = '0';
    viewportService.resize();
    update();

    var player = character.create(20, 20, mapService.currentLevel.layers[0]);

    var timerId = setInterval(function() {
        //$log.debug('tick');
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        viewportService.update();
        player.handleMessage('step');
    }, 60);

    mapService.currentLevel.layers[0].add(
        player,
        20, 20
    );

    viewportService.player = player;

    var imageSquare = spriteImage.create('╔══╗║ss║║  ║╚══╝', 4, 4, 1, 3);
    var spriteSquare = sprite.create(imageSquare, new rect.Rect(-1, -3, 4, 4));


    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(40, 20, spriteSquare));
    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(60, 30, spriteSquare));
    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(80, 10, spriteSquare));

    /*setTimeout(function run() {
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        setTimeout(run, 17);
    }, 17);*/

});
