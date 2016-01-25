app.controller("viewport", function ($scope, characterData, characterControl, mouseService) {
    var width = 60;
    var height = 20;

    $scope.gameview = [];

    for (var i=0; i<height; i++) {
        $scope.gameview[i] = [];
        for (var j=0; j<width; j++) {
            $scope.gameview[i][j] = " ";
        }
    }

    $scope.gameview[characterData.y][characterData.x] = '0';

    characterControl.moveHandler( function (relX, relY) {
        $scope.gameview[characterData.y][characterData.x] = '.';
        characterData.x += relX;
        characterData.y += relY;
        $scope.gameview[characterData.y][characterData.x] = '0';
        console.log(characterData.x + " " + characterData.y);
        $scope.$apply();
    });

    mouseService.addMouseHandler("mousedown", function (evt, cellX, cellY) {
        $scope.gameview[cellY][cellX] = "X";
        $scope.$apply();
    })
    
});