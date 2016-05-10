(function () {
    'use strict';

    angular
        .module('app')
        .service('ppReady', paperProject);

    paperProject.$inject = ['$q'];

    function paperProject ($q) {
        this.projectReadyDeffered = $q.defer();
        this.isReady = this.projectReadyDeffered.promise;
    }

})();
