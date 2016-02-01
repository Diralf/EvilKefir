app = angular.module("app", []);

app.run(function ($rootScope, keyboardService, mapService, viewportService) {
    //console.log($rootScope);

    keyboardService.init();
    mapService.init();
    viewportService.init();

    //mapLoader.load();
});

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});
