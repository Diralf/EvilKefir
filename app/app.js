angular.module('app', []);

(function () {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$http', 'keyboard', 'mapService', 'viewportService'];

    function appRun($rootScope, $http, keyboard, mapService, viewportService) {
        //console.log($rootScope);

        keyboard.init();
        mapService.init();
        viewportService.init();

        //mapLoader.load();
        var onEnter = function () {
            //console.log('start game send request');
            /*$http.post('/game/0', {checkpoint: 'cehck enter'}).then(function () {

            });*/
        };

        onEnter();
    }
})();

