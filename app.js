app = angular.module("app", []);

app.run(function ($document, $rootScope, keyboardService, mapService, viewportService, mapLoader, layer, collection) {
    //console.log($rootScope);

    keyboardService.init();
    mapService.init();
    viewportService.init();

    //mapLoader.load();
});
