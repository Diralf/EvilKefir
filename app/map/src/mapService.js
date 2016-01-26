app.service("mapService", function () {
    var self = this;
    this.mapLines = [];
    this.width = 500;
    this.height = 500;

    for (var i=0; i<self.height; i++) {
        self.mapLines[i] = "";
        for (var j=0; j<self.width; j++) {
            self.mapLines[i] += ".";
        }
    }
});
