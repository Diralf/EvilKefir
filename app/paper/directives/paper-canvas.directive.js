(function () {
    'use strict';

    angular
        .module('app')
        .directive('paperCanvas', paperDirective);

    paperDirective.$inject = ['$window', 'ppReady'];

    function paperDirective($window, ppReady) {
        var directive = {
            restrict: 'E',
            replace: true,
            template: '<canvas></canvas>',
            link: linkFunc
        };

        function linkFunc(scope, element, attrs) {
            resize();

            paper.setup(element[0]);
            ppReady.projectReadyDeffered.resolve();

            // Create a rectangle shaped path with its top left point at
// {x: 75, y: 75} and a size of {width: 75, height: 75}
            var path = new Path.Rectangle({
                point: [75, 75],
                size: [75, 75],
                strokeColor: 'black'
            });

            view.onFrame = function (event) {
                // Each frame, rotate the path by 3 degrees:
                path.rotate(3);
            }

            angular.element($window).bind('resize', resize);

            function resize() {
                attrs.$set('width', element.parent()[0].clientWidth);
                attrs.$set('height', element.parent()[0].clientHeight);
            }
        }

        return directive;
    }

})();