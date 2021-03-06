app.service("characterControl", ['keyboardService', function (keyboardService) {
    var moveCharacterOn;

    keyboardService.addHandler("W", function (key, evt) {
        moveCharacterOn(0, -1);
    });

    keyboardService.addHandler("A", function (key, evt) {
        moveCharacterOn(-1, 0);
    });

    keyboardService.addHandler("S", function (key, evt) {
        moveCharacterOn(0, 1);
    });

    keyboardService.addHandler("D", function (key, evt) {
        moveCharacterOn(1, 0);
    });

    this.moveHandler = function (handler) {
        moveCharacterOn = handler;
    }
}]);
