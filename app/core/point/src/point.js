app.service("point", [function () {
    this.create = function (x, y) {
        return new Point(x, y);
    }

    function Point(x, y) {
        this.x = +x;
        this.y = +y;
    }
}]);
