app = angular.module("app", []);

app.controller("first", function ($document, $rootScope, keyboardService) {
    //$scope.hello = "world!!!";

    console.log($rootScope);

    keyboardService.init();
    
})