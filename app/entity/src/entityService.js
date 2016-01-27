app.service("entityService", ["collection", function (collection) {
    var self = this;
    var validID = 0;
    var entityCollection = collection.create();

    this.Entity = function (name) {
        this.name = name;
    };

    this.createEntity = function (name) {
        entityCollection.add(validID, new self.Entity(name), true);
        validID++;
    };

    self.createEntity("bla");
    self.createEntity("bla");

    console.log(entityCollection.getCollection());

}]);
