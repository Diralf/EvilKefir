app.service("mouseService", function () {
    var mouseHandlers = {};

    this.emitMouseEvent = function (event, evtObj, cellX, cellY) {
        if (!mouseHandlers[event]) {
            console.error("mouseEvent: " + event + " - no handlers");
            return;
        }
        mouseHandlers[event].forEach(function (handleItem) {
            handleItem(evtObj, cellX, cellY);
        })
    }

    this.addMouseHandler = function (event, handler) {
        if (!mouseHandlers[event]) {
            mouseHandlers[event] = [];
        }
        mouseHandlers[event].push(handler);
    }
})