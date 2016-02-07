app.service("dimension", [function () {
    this.create = function (w, h) {
        return new Dimension(w, h);
    };

    function Dimension (w, h) {
        this.w = w;
        this.h = h;
    }
}]);
