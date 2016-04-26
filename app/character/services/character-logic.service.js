(function () {
    'use strict';

    angular
        .module('app')
        .service('characterLogic', characterLogic);

    characterLogic.$inject = ['characterData', 'mapService'];

    function characterLogic(characterData, mapService) {
        this.init = function () {
            mapService.getLayers().low.add('0', characterData.x, characterData.y);
        };
    }

})();


