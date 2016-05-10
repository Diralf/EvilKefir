(function () {
    'use strict';

    angular
        .module('app')
        .factory('On', on);

    on.$inject = ['HappenSet'];

    function on(HappenSet) {

        On.prototype.event = happen;
        On.prototype.emit = emit;

        return On;

        /////////////////////////////////////////////

        /**
         * @constructor
         */
        function On() {
            this.on = this;
            /**
             * @type {HappenSet}
             */
            this.happenSet = new HappenSet();
        }

        /**
         * @param {string} happenName
         * @param {function|Listener} handler
         * @returns {Listener}
         */
        function happen(happenName, handler) {
            return this.happenSet.add(happenName, handler);
        }

        /**
         * @param {string} nameEvent
         * @returns {emit}
         */
        function emit(nameEvent) {
            var happen = this.happenSet.get(nameEvent);

            happen.update(arguments);

            return this;
        }
    }

})();
