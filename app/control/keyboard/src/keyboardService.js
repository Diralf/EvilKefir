app.service("keyboardService", ['$document', 'KEYS', function ($document, KEYS) {
    var self = this;

    var _handleKeyEvent = {};

    this.init = function () {
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

    this.addHandler = function (key, listener) {
        _handleKeyEvent[key] = listener;
    }
}]);
