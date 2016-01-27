app.controller("viewport", function ($scope, characterData, characterControl, mouseService, mapService, viewportService) {

    characterControl.moveHandler( function (relX, relY) {
        viewportService.viewport[characterData.y][characterData.x] = '.';
        characterData.x += relX;
        characterData.y += relY;
        viewportService.viewport[characterData.y][characterData.x] = '0';

        update();
        $scope.$apply();
    });

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY) {
        viewportService.viewport[cellY][cellX] = "X";

        update();
        $scope.$apply();
    })

    function update() {
        viewportService.update("/");
        $scope.gameviewLine.length = 0;
        $scope.gameviewLine = viewportService.viewport;
        /*for (var i = 0; i < viewportService.hcells; i++) {
            $scope.gameviewLine[i] = "";
            for (var j = 0; j < viewportService.wcells; j++) {
                $scope.gameviewLine[i] += viewportService.viewport[i][j];
            }
        }*/
    }

    $scope.gameviewLine = [];

    viewportService.init("=");

    viewportService.viewport[characterData.y][characterData.x] = '0';
    update();

});
