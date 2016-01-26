app = angular.module("app", []);

app.controller("init", function ($document, $rootScope, keyboardService) {
    console.log($rootScope);

    keyboardService.init();
});