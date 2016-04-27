(function () {
    'use strict';

    angular
        .module('app')
        .factory('PointLimit', pointLimit);

    pointLimit.$inject = ['Point'];

    function pointLimit(Point) {

        var PointLimit = classPointLimit;
        PointLimit.prototype = Object.create(Point.prototype);
        PointLimit.prototype.moveIn = moveIn;

        return PointLimit;

        //////////////////////////////////////////////////////////////

        function classPointLimit(x, y, pointMin, pointMax) {
            Point.call(this, x, y);
            this.pointMin = pointMin || null;
            this.pointMax = pointMax || null;

            this.moveIn(x, y);
        }

        function moveIn(x, y) {
            if (this.pointMin && x < this.pointMin.x) {
                x = this.pointMin.x;
            }
            if (this.pointMin && y < this.pointMin.y) {
                y = this.pointMin.y;
            }
            if (this.pointMax && x > this.pointMax.x) {
                x = this.pointMax.x;
            }
            if (this.pointMax && y > this.pointMax.y) {
                y = this.pointMax.y;
            }

            Point.prototype.moveIn.call(this, x, y);
        }
    }

})();
