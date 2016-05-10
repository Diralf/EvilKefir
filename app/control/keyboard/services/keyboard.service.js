(function () {
    'use strict';

    angular
        .module('app')
        .service('keyboard', keyboard);

    keyboard.$inject = ['$document', 'KEYS', 'On'];

    function keyboard($document, KEYS, On) {
        var self = this;
        var _handleKeyEvent = {};

        this.on = new On();
        this.init = init;
        this.addHandler = addHandler;

        function init() {
            $document.bind('keydown', function(evt) {
                console.log(evt.which);
                var key = KEYS[evt.which];
                if (key) {
                    evt.preventDefault();
                    self.on.emit(key, evt);
                }
            });
        }

        function addHandler(key, listener) {
            _handleKeyEvent[key] = listener;
        }
    }

})();
