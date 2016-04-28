(function () {
    'use strict';

    angular
        .module('app')
        .directive('paperCanvas', paperDirective);

    paperDirective.$inject = [];

    function paperDirective() {
        var directive = {
            restrict: 'E',
            replace: true,
            template: '<canvas width="640" height="480"></canvas>',
            link: linkFunc
        };

        function linkFunc(scope, element) {
            paper.setup(element[0]);
        }

        return directive;
    }

})();