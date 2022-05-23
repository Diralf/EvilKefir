app.directive("viewportLine", function ($log, mouseService, symbolWidthService) {
    return {
        restrict: "EA",
        link: function ($scope, $element, $attr) {

            $element.bind("mousedown", function (evt) {
                $log.debug('eventMouse');
                mouseService.emitMouseEvent("mousedown", evt, symbolWidthService.xToSymbolNumber(evt.offsetX), $attr.cellY);
            });

            $element.bind("mouseover", function (evt) {
                $element.find("div").addClass("show");
            });

            $element.bind("mouseout", function (evt) {
                $element.find("div").removeClass("show");
            });

            $element.on("mousemove", function (evt) {
                if (evt.target.tagName == "SPAN") {
                    evt.preventDefault();
                    $element.find("div").css("left", symbolWidthService.xToCellX(evt.offsetX) + "px");
                }
            });
        }
    }
});
