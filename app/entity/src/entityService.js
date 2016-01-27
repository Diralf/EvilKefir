app.service("entityService", ["entityCollection", function (entityCollection) {

    console.log(entityCollection.set("obj1", {a: 4, b: 5}));
    entityCollection.set("obj2", {a: 2, b: 3}, true);
    entityCollection.set("obj3", {a: 6, b: 6});
    entityCollection.set("obj4", {a: 8, b: 1}, true);

    var obj = entityCollection.get("obj3");

    console.log("object before deletion");
    console.log(obj);

    console.log("collection before deletion");
    console.log(entityCollection.getCollection());

    entityCollection.clear();

    console.log("object after deletion");
    console.log(obj);

    console.log("collection after deletion");
    console.log(entityCollection.getCollection());

}]);
