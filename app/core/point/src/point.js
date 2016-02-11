app.service("point", [function () {
    this.create = function (x, y) {
        return new this.Point(x, y);
    };

    this.Point = function (x, y) {
        this.x = +x || 0;
        this.y = +y || 0;
    };

    this.Point.prototype.moveIn = function (x, y) {
        this.x = +x;
        this.y = +y;
    };

    this.Point.prototype.moveOn = function (x, y) {
        this.moveIn(this.x + x, this.y + y);
    };

    this.Point.prototype.setPoint = function (point) {
        this.moveIn(point.x, point.y);
    };
}]);
