app = angular.module("app", []);

app.run(['$rootScope', '$http', 'keyboardService', 'mapService', 'viewportService',
    function ($rootScope, $http, keyboardService, mapService, viewportService) {
    //console.log($rootScope);
    $rootScope.isNotDesktop = null;
        $rootScope.deviceMessage = '';

    keyboardService.init();
    mapService.init();
    viewportService.init();

    //mapLoader.load();
    var onEnter = function () {
        //console.log('start game send request');
        $http.get('/isdesk').then(function (res) {
            $rootScope.isNotDesktop = res.data != 'desktop';
            $rootScope.deviceMessage = "Sorry bro it's only for PC Master race";
        });

        $http.post('/game/0', {checkpoint: "cehck enter"}).then(function (response) {

        });
    };

    onEnter();
}]);

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

app.constant('transparentSymbol', 'g');
