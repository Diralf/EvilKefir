app = angular.module("app", []);

app.run(function ($document, $rootScope, keyboardService, mapService, viewportService, mapLoader) {
    console.log($rootScope);

    keyboardService.init();
    mapService.init();
    viewportService.init();

    //mapLoader.load();
});
