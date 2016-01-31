app.service("mapData", ["collection", function (collection) {
    this.mapLines = [];
    this.mapData = collection.create();
    this.width = 500;
    this.height = 500;
}]);
