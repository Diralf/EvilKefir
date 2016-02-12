app = angular.module("app", []);

app.run(function ($rootScope, $window, $http, keyboardService, mapService, viewportService) {
    //console.log($rootScope);

    keyboardService.init();
    mapService.init();
    viewportService.init();

    //mapLoader.load();
    var onEnter = function () {
        //console.log('start game send request');
        $http.post('/game/0', {checkpoint: "cehck enter"}).then(function (response) {
            //console.log('start game response recived');
        });
    };

    var onExit = function () {
        //console.log('end game send request');
        $http.post('/game/1', {checkpoint: "cehck exit"}).then(function (response) {
            //console.log('end game response recived');
        });
    };

    onEnter();
    $window.onbeforeunload = onExit;
});

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});
