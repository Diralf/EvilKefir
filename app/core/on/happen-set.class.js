(function () {
    'use strict';

    angular
        .module('app')
        .factory('HappenSet', happenSet);

    happenSet.$inject = ['Happen', 'Listener'];

    function happenSet(Happen, Listener) {

        /**
         * @constructor
         */
        function HappenSet() {
            this.happens = {};
        }

        /**
         * @param {string} happenName
         * @param {function|Listener} handler
         * @return {Listener}
         */
        HappenSet.prototype.add = function (happenName, handler) {
            var listener = (handler instanceof Listener) ? handler : new Listener(handler);

            if (!this.happens[happenName]) {
                this.happens[happenName] = new Happen(happenName);
            }

            this.happens[happenName].listeners.push(listener);

            return listener;
        };

        /**
         * @param {string} happenName
         * @returns {Happen}
         */
        HappenSet.prototype.get = function (happenName) {
            var happen = this.happens[happenName];
            if (!happen) {
                happen = new Happen(happenName);
            }
            return happen;
        };

        return HappenSet;

    }

})();