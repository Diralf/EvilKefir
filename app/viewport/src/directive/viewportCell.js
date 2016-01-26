app.directive("viewportCell", function (mouseService) {
    return {
        restrict: "A",
        link: function ($scope, $element, $attr) {
            $element.bind("mousedown", function (evt) {
                mouseService.emitMouseEvent("mousedown", evt, $attr.cellX, $attr.cellY);
            });
        }
    }
});
