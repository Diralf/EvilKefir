(function () {
    'use strict';

    angular
        .module('app')
        .factory('Listener', listener);

    listener.$inject = [];

    function listener() {

        /**
         * @param {function} action
         * @constructor
         */
        function Listener(action) {
            this.action = action;
        }

        /**
         * @param {Array} args
         */
        Listener.prototype.update = function (args) {
            this.action.apply(this, args);
        };

        return Listener;

    }

})();