(function () {
    'use strict';

    angular
        .module('app')
        .factory('Happen', happen);

    happen.$inject = [];

    function happen() {

        /**
         * @param {string} id
         * @constructor
         */
        function Happen(id) {
            this.id = id;
            this.listeners = [];
        }

        /**
         * @param {Array} params
         */
        Happen.prototype.update = function (params) {
            _.forEach(this.listeners, function forEachListeners(item) {
                setTimeout(function applyListener() {
                    item.update(params);
                }, 1);
            });
        };

        Happen.prototype.isEmpty = function () {
            return this.listeners.length === 0;
        };

        return Happen;
    }

})();