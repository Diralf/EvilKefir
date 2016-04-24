/**
 * for correctly work: place that directive in element with size equal viewport.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .directive('symbolWidth', symbolWidth);

    symbolWidth.$inject = ['symbolWidthService'];

    function symbolWidth(symbolWidthService) {
        return {
            restrict: 'AE',
            template: '<div class="symbol-width">S</div>',
            replace: true,
            link: function ($scope, $element) {
                checkSymbolSize();

                $scope.$watch(function () {
                    return $element.parent()[0].getBoundingClientRect().width;
                }, function () {
                    checkSymbolSize();
                });

                $scope.$watch(function () {
                    return $element.parent()[0].getBoundingClientRect().height;
                }, function () {
                    checkSymbolSize();
                });

                function checkSymbolSize() {
                    symbolWidthService._setSizeOneSymbol(
                        +$element[0].getBoundingClientRect().width,
                        +$element[0].getBoundingClientRect().height,
                        +$element.parent()[0].getBoundingClientRect().width,
                        +$element.parent()[0].getBoundingClientRect().height
                    );
                }
            }
        };
    }

})();
