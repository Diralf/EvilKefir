app = angular.module("app", []);

app.run(function ($rootScope, $window, $http, keyboardService, mapService, viewportService) {
    //console.log($rootScope);

    keyboardService.init();
    mapService.init();
    viewportService.init();

    //mapLoader.load();
    var onEnter = function () {
        console.log('start game send request');
        $http.get('/game/0').then(function () {
            console.log('start game response recived');
        });
    };

    var onExit = function () {
        console.log('end game send request');
        $http.get('/game/1').then(function () {
            console.log('end game response recived');
        });
        //return ('bye bye');
    };

    onEnter();
    $window.onbeforeunload = onExit;
});

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});
