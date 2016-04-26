(function () {
    'use strict';

    angular
        .module('app')
        .service('characterData', characterData);

    function characterData() {
        this.x = 15;
        this.y = 10;
    }

})();
