(function () {
    'use strict';

    angular
        .module('app')
        .factory('On', on);

    on.$inject = [];

    function on() {

        var classOn = On;
        classOn.prototype.event = eventMethod;
        classOn.prototype.emit = emit;

        return classOn;

        /////////////////////////////////////////////

        /**
         * @constructor
         */
        function On() {
            /**
             * @type {Object}
             */
            this.listeners = {};
        }

        /**
         * @param {string} nameEvent
         * @param {function} listener
         * @returns {eventMethod}
         */
        function eventMethod(nameEvent, listener) {
            if (!this.listeners[nameEvent]) {
                this.listeners[nameEvent] = [];
            }

            this.listeners[nameEvent].push(listener);
            return this;
        }

        /**
         * @param {string} nameEvent
         * @returns {emit}
         */
        function emit(nameEvent) {
            var params = arguments;
            if (this.listeners[nameEvent]) {
                _.forEach(this.listeners[nameEvent], function forEachListeners(item) {
                    setTimeout(function applyListener() {
                        item.apply(this, params);
                    }, 1);
                });
            }
            return this;
        }
    }

})();
