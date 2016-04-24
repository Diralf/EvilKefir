(function () {
    'use strict';

    angular
        .module('app')
        .service('unique', unique);

    unique.$inject = [];

    function unique() {
        var validID = '000000000000';
        var abc = '0123456789abcdefghijklmnopqrstuvwxyz';


        this.value = 100;
        //TODO реализовать генерацию уникальных ID
    }

})();
