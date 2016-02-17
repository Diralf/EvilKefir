app.directive("viewportLine", ['$log', 'mouseService', 'symbolWidthService', function ($log, mouseService, symbolWidthService) {
    return {
        restrict: "EA",
        link: function ($scope, $element, $attr) {

            $scope.onMouseDown = function (evt) {
                mouseService.emitMouseEvent(
                    "mousedown",
                    evt,
                    symbolWidthService.xToSymbolNumber(evt.offsetX),
                    $attr.cellY);
            };

            $scope.onMouseUp = function (evt) {
                mouseService.emitMouseEvent(
                    "mouseup",
                    evt,
                    symbolWidthService.xToSymbolNumber(evt.offsetX),
                    $attr.cellY);
            };

            $element.bind("mouseover", function (evt) {
                $element.find("div").addClass("show");
                $element.parent().find("i").addClass('show');
            });

            $element.bind("mouseout", function (evt) {
                $element.find("div").removeClass("show");
                $element.parent().find("i").removeClass('show');
            });

            $element.on("mousemove", function (evt) {
                if (evt.target.tagName == "SPAN") {
                    evt.preventDefault();
                    $element.find("div").css("left", symbolWidthService.xToCellX(evt.offsetX) + "px");
                    var i = $element.parent().find("i");
                    i.css("left", symbolWidthService.xToCellX(evt.offsetX+20) + "px");
                    i.css("top", $element[0].offsetTop + "px");
                }

                mouseService.emitMouseEvent(
                    "mousemove",
                    evt,
                    symbolWidthService.xToSymbolNumber(evt.offsetX),
                    $attr.cellY);
            });
        }
    }
}]);
