app.service('collision', [function () {
    this.pointToRect = function (point, rect) {
        return !(point.x < rect.x
            || point.x >= (rect.x + rect.w)
            || point.y < rect.y
            || point.y >= (rect.y + rect.h) );
    };

    this.rectIntersectRect = function (rect1, rect2) {
        return !(
            (rect1.y + rect1.h) <= (rect2.y) ||
            (rect1.y) >= (rect2.y + rect2.h) ||
            (rect1.x + rect1.w) <= (rect2.x) ||
            (rect1.x) >= (rect2.x + rect2.w)
        )
    };

    this.rectIncludeRect = function (rect1, rect2) {
        return this.pointToRect({x: rect1.x, y: rect1.y}, rect2)
            && this.pointToRect({
                x: rect1.x + rect1.w - 1,
                y: rect1.y + rect1.h - 1},
                rect2);
    };
}]);