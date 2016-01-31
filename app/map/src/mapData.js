app.service("mapData", ["symbolGrid", function (symbolGrid) {
    this.grid = symbolGrid.create();
    this.width = 500;
    this.height = 500;
}]);
