app.controller("viewport", function ($scope, character) {
    var width = 40;
    var height = 30;

    $scope.gameview = [];

    for (var i=0; i<height; i++) {
        $scope.gameview[i] = [];
        for (var j=0; j<width; j++) {
            $scope.gameview[i][j] = "-";
        }
    }


    $scope.gameview[character.y][character.x] = '0';

    character.moveHandler( function (relX, relY) {
        $scope.gameview[character.y][character.x] = '-';
        character.x += relX;
        character.y += relY;
        $scope.gameview[character.y][character.x] = '0';
        console.log(character.x + " " + character.y);
        $scope.$apply();
    });
});