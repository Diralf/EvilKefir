app.service("keyboardService", function ($document, KEYS) {
    var self = this;

    var _handleKeyEvent = {};

    this.init = function () {
        $document.bind('keydown', function(evt) {
            var key = KEYS[evt.which];
            if (key) {
                // Нажата нужная клавиша
                evt.preventDefault();
                console.log(key);
                if (_handleKeyEvent[key]) {
                    _handleKeyEvent[key](evt);
                }
            }
        });
    }

    this.addHandler = function (key, listener) {
        _handleKeyEvent[key] = listener;
    }

    
});