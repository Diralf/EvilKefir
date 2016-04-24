(function () {
    'use strict';

    angular
        .module('app')
        .service('pointLimit', pointLimit);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    pointLimit.$inject = ['point'];

    function pointLimit(point) {
        this.create = create;

        this.PointLimit = PointLimit;

        this.PointLimit.prototype = Object.create(point.Point.prototype);

        this.PointLimit.prototype.moveIn = moveIn;

        //////////////////////////////////////////////////////////////

        function create(x, y, pointMin, pointMax) {
            return new this.PointLimit(x, y, pointMin, pointMax);
        }

        function PointLimit(x, y, pointMin, pointMax) {
            point.Point.call(this, x, y);
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

            point.Point.prototype.moveIn.call(this, x, y);
        }
    }

})();
