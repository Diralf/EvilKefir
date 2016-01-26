app.directive("viewportLine", function (mouseService, viewportService) {
    return {
        restrict: "EA",
        link: function ($scope, $element, $attr) {

            $element.bind("mousedown", function (evt) {
                mouseService.emitMouseEvent("mousedown", evt, viewportService.xToSymbolNumber(evt.offsetX), $attr.cellY);
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
                    $element.find("div").css("left", viewportService.xToCellX(evt.offsetX) + "px");
                }
            });
        }
    }
});
