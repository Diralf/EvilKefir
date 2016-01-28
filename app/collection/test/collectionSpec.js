describe('answersServiceTest', function () {

    var collection;
    var injector;

    beforeEach(function () {
        module('app');

        inject(function (_collection_) {
            collection = _collection_;
        });
    });

    it('it should be Collection when call collection.create()', function () {
        var coll = collection.create();

        expect(coll instanceof collection.Collection).toEqual(true);
    });

    describe('method getCollection()', function () {
        it ('when call getCollection once, should return empty object', function () {
            var coll = collection.create();

            expect(coll.getCollection()).toEqual({});
        })
    })

    describe('method set()', function () {

        it('when coll.set() without params it should be return error', function () {
            var coll = collection.create();

            expect(function () {coll.set()}).toThrow(new Error("Param 'key' is not defined!"));
        });

        it('when coll.set(key) call without entity param it should be return error', function () {
            var coll = collection.create();

            expect(function () {coll.set(0)}).toThrow(new Error("Param 'entity' is not defined!"));
            expect(function () {coll.set("some_key")}).toThrow(new Error("Param 'entity' is not defined!"));
        });

        it('when coll.set(key) call FIRST time it should be return undefined', function () {
            var coll = collection.create();
            var obj1 = {some: "value"};
            var obj2 = {a: "new"};

            var resultFirst = coll.set(0, obj1);
            expect(typeof resultFirst).toEqual("undefined");
            expect(coll.getCollection()).toEqual({"0": obj1});

            var resultSecond = coll.set(0, obj2);
            var prev = obj1;
            expect(resultSecond).toEqual(prev);
            expect(coll.getCollection()).toEqual({"0": obj2});

            var resultThird = coll.set(1, obj2);
            expect(typeof resultThird).toEqual("undefined");
            expect(coll.getCollection()).toEqual({"0": obj2, "1": obj2});

        });

    })

});
