(function () {
    'use strict';

    angular
        .module('app')
        .factory('Point', point);

    point.$inject = [];

    function point() {

        var Point = classPoint;
        Point.prototype.moveIn = moveIn;
        Point.prototype.moveOn = moveOn;
        Point.prototype.setPoint = setPoint;

        return Point;

        ////////////////////////////////////////////////////////

        function classPoint(x, y) {
            this.x = +x || 0;
            this.y = +y || 0;
        }

        function moveIn(x, y) {
            this.x = +x;
            this.y = +y;
        }

        function moveOn(x, y) {
            this.moveIn(this.x + x, this.y + y);
        }

        function setPoint(point) {
            this.moveIn(point.x, point.y);
        }
    }

})();
