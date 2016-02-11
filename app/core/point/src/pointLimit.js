app.service('pointLimit', ['point', function (point) {
    this.create = function (x, y, pointMin, pointMax) {
        return new this.PointLimit(x, y, pointMin, pointMax);
    };

    this.PointLimit = function (x, y, pointMin, pointMax) {
        point.Point.call(this, x, y);
        this.pointMin = pointMin || null;
        this.pointMax = pointMax || null;

        this.moveIn(x, y);
    };

    this.PointLimit.prototype = Object.create(point.Point.prototype);

    this.PointLimit.prototype.moveIn = function (x, y) {
        if (this.pointMin && x < this.pointMin.x) x = this.pointMin.x;
        if (this.pointMin && y < this.pointMin.y) y = this.pointMin.y;
        if (this.pointMax && x > this.pointMax.x) x = this.pointMax.x;
        if (this.pointMax && y > this.pointMax.y) y = this.pointMax.y;

        point.Point.prototype.moveIn.call(this, x, y);
    }
}]);
