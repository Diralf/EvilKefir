app.service("entityService", ["collection", function (collection) {
    var self = this;
    var validID = 0;
    var entityCollection = collection.create();

    this.Entity = function (name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    };

    this.createEntity = function (name) {
        var entity = entityCollection.add(validID, new self.Entity(name));
        validID++;
        return entity;
    };

}]);
