app.controller("viewport", function ($scope, $log, character, characterData, characterControl, mouseService, mapService, viewportService, render, symbolWidthService, entityVisible, spriteImage) {

    /*characterControl.moveHandler( function (relX, relY) {

        if (!mapService.getLayers()[0].moveOn(characterData.x, characterData.y, relX, relY)) {
            characterData.x += relX;
            characterData.y += relY;
        }

        $scope.$apply();
        update();
    });*/

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY) {
        var imageSquare = spriteImage.create('╔══╗║  ║║  ║╚══╝', 4, 4, 1, 3);

        mapService.getLayers()[0].add(
            entityVisible.create(
                viewportService.xcells + cellX,
                viewportService.ycells + cellY,
                imageSquare
            )
        );
    })

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

    /*setTimeout(function run() {
        $scope.gameviewLine = render.draw();
        $scope.$apply();
        setTimeout(run, 17);
    }, 17);*/

});
