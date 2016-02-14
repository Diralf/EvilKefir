app.service("mouseService", function ($log) {
    var mouseHandlers = {};

    this.emitMouseEvent = function (event, evtObj, cellX, cellY) {
        if (!mouseHandlers[event]) {
            $log.error("mouseEvent: " + event + " - no handlers");
            return;
        }
        mouseHandlers[event].forEach(function (handleItem, index) {
            handleItem(evtObj, +cellX, +cellY, function (result) {
                $log.debug('handling ' + index + ' ' + event + ' finished - result: ' + result);
            });
        })
    };

    this.addMouseHandler = function (event, handler) {
        if (!mouseHandlers[event]) {
            mouseHandlers[event] = [];
        }
        mouseHandlers[event].push(handler);
    }
});
