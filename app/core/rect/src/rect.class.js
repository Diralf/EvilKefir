(function () {
    'use strict';

    angular
        .module('app')
        .factory('Rect', rect);

    rect.$inject = ['Point'];

    function rect(Point) {

        var Rect = classRect;

        return Rect;

        //////////////////////////////////////////////////

        function classRect(x, y, w, h) {
            this.place = new Point(x || 0, y || 0);
            this.size = new Point(w || 0, h || 0);

            Object.defineProperty(this, 'x', {
                get: function() {
                    return this.place.x;
                },
                set: function (nx) {
                    this.place.moveIn(nx, this.place.y);
                }
            });

            Object.defineProperty(this, 'y', {
                get: function() {
                    return this.place.y;
                },
                set: function (ny) {
                    this.place.moveIn(this.place.x, ny);
                }
            });

            Object.defineProperty(this, 'w', {
                get: function() {
                    return this.size.x;
                },
                set: function (nw) {
                    this.size.moveIn(nw, this.size.y);
                }
            });

            Object.defineProperty(this, 'h', {
                get: function() {
                    return this.size.y;
                },
                set: function (nh) {
                    this.size.moveIn(this.size.x, nh);
                }
            });
        }
    }

})();
