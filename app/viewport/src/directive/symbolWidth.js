app.directive("symbolWidth", function (viewportService) {
    return {
        restrict: "AE",
        template: "<div class='symbol-width'>S</div>",
        replace: true,
        link: function ($scope, $element, $attr) {
            checkSymbolSize();

            $scope.$watch(function () {
                return $("div.viewport").width();
            }, function () {
                checkSymbolSize();
            });

            $scope.$watch(function () {
                return $("div.viewport").height();
            }, function () {
                checkSymbolSize();
            });

            function checkSymbolSize() {
                viewportService._setSizeOneSymbol(
                    $element[0].getBoundingClientRect().width,
                    $element[0].getBoundingClientRect().height,
                    $("div.viewport").width(),
                    $("div.viewport").height()
                );
            }
        }
    }
});