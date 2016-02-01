app.service("entity", ["collection", function (collection) {
    var self = this;
    var validID = 0;
    var entityCollection = collection.create();

    this.create = function () {
        var entity = entityCollection.add(validID, new this.Entity(validID));
        validID++;
        return entity;
    };

    this.Entity = function (id) {
        this.id = id;
    };

}]);
