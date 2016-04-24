var app = angular.module('app', []);

(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$http', 'keyboardService', 'mapService', 'viewportService'];

    function appRun($rootScope, $http, keyboardService, mapService, viewportService) {
        console.log($rootScope);

        keyboardService.init();
        mapService.init();
        viewportService.init();

        //mapLoader.load();
        var onEnter = function () {
            //console.log('start game send request');
            $http.post('/game/0', {checkpoint: 'cehck enter'}).then(function () {

            });
        };

        onEnter();
    }
})();

