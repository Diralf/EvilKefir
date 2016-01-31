app.service("characterLogic", ['characterData', 'mapService', function (characterData, mapService) {
    this.init = function () {
        mapService.getLayers().low.add('0', characterData.x, characterData.y);
    }
}]);

app.run(['characterLogic', function (characterLogic) {
    characterLogic.init();
}]);
