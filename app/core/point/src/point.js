(function () {
    'use strict';

    angular
        .module('app')
        .service('point', point);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    point.$inject = [];

    function point() {
        this.create = create;

        this.Point = Point;
        this.Point.prototype.moveIn = moveIn;
        this.Point.prototype.moveOn = moveOn;
        this.Point.prototype.setPoint = setPoint;

        ////////////////////////////////////////////////////////

        function create(x, y) {
            return new this.Point(x, y);
        }

        function Point(x, y) {
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
