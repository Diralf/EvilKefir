app.controller("viewport", function ($scope, $log, characterData, characterControl, mouseService, mapService, viewportService, render, symbolWidthService, entityVisible, spriteImage) {

    /*characterControl.moveHandler( function (relX, relY) {

        if (!mapService.getLayers()[0].moveOn(characterData.x, characterData.y, relX, relY)) {
            characterData.x += relX;
            characterData.y += relY;
        }

        $scope.$apply();
        update();
    });*/

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY) {
        //viewportService.viewport[cellY][cellX] = "X";
        //mapService.getLayers().low.add("X", cellX, cellY);
        var imageSquare = spriteImage.create('╔══╗║  ║║  ║╚══╝', 4, 4, 1, 3);
        mapService.getLayers()[0].add(entityVisible.create(cellX, cellY, imageSquare));


        $scope.$apply();
        update();
    })

    function update() {
        $scope.gameviewLine = render.draw();
    }

    symbolWidthService.addListener('resize', function () {
        viewportService.resize();
        $scope.gameviewLine = render.draw();
    });

    $scope.gameviewLine = [];

    viewportService.init("=");

    //viewportService.viewport[characterData.y][characterData.x] = '0';
    viewportService.resize();
    update();

    $log.debug("debug");
    $log.info("info");
    $log.warn("warn");
    $log.error("error");
    $log.log("log");

});
