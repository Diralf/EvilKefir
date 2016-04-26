(function () {
    'use strict';

    angular
        .module('app')
        .service('keyboardService', keyboardService);
    //TODO убрать Service в названии

    keyboardService.$inject = ['$document', 'KEYS'];

    function keyboardService($document, KEYS) {
        var _handleKeyEvent = {};

        this.init = init;
        this.addHandler = addHandler;

        function init() {
            $document.bind('keydown', function(evt) {
                var key = KEYS[evt.which];
                if (key) {
                    // Нажата нужная клавиша
                    evt.preventDefault();
                    if (_handleKeyEvent[key]) {
                        _handleKeyEvent[key](evt);
                    }
                }
            });
        }

        function addHandler(key, listener) {
            _handleKeyEvent[key] = listener;
        }
    }

})();
