(function () {
    'use strict';

    angular
        .module('app')
        .service('actionCollection', actionCollection);

    actionCollection.$inject = [];

    function actionCollection() {
        this.current = null;
        this.sets = {};
    }

})();
