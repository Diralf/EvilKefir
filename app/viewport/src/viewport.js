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
    spriteImage,
    staticObject) {

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
        mapService.getLayers()[0].eachRect(_x - 20, _y - 10, 40, 20, function (x, y, entity) {
            //console.log(arguments);
            if (entity.isPointMeet(_x, _y)) {
                callback(entity.handleMessage('look'));
            }
        });

        /*var entity = mapService.getLayers()[0].get(viewportService.pos.x + cellX, viewportService.pos.y + cellY);

        if (entity) {
            callback(entity.handleMessage('look'));
        }*/
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

    var timerId = setInterval(function() {
        //$log.debug('tick');
        $scope.gameviewLine = render.draw();
        $scope.$apply();
    }, 17);

    mapService.currentLevel.layers[0].add(
        character.create(20, 20, mapService.currentLevel.layers[0]),
        20, 20
    );

    var imageSquare = spriteImage.create('╔══╗║ss║║  ║╚══╝', 4, 4, 1, 3);


    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(40, 20, imageSquare));
    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(60, 30, imageSquare));
    mapService.currentLevel.layers[0].add(new staticObject.StaticObject(80, 10, imageSquare));

    /*setTimeout(function run() {
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        setTimeout(run, 17);
    }, 17);*/

});
