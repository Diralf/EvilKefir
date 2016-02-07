app.service("mouseService", function ($log) {
    var mouseHandlers = {};

    this.emitMouseEvent = function (event, evtObj, cellX, cellY) {
        $log.debug('emitMouseEvent');
        if (!mouseHandlers[event]) {
            console.error("mouseEvent: " + event + " - no handlers");
            return;
        }
        mouseHandlers[event].forEach(function (handleItem) {
            $log.debug('call handler');
            $log.debug(handleItem);
            handleItem(evtObj, +cellX, +cellY);
        })
    }

    this.addMouseHandler = function (event, handler) {
        $log.debug('addMouseHandler ' + event);
        $log.debug(handler);
        if (!mouseHandlers[event]) {
            mouseHandlers[event] = [];
        }
        mouseHandlers[event].push(handler);
    }
});
