describe('collection', function () {

    var collection;
    var injector;

    beforeEach(function (done) {
        module('app');

        inject(function (_collection_) {
            collection = _collection_;

            done();
        });
    });

    beforeEach(function () {
        this.testCollection = collection.create();
    });

    describe('.create()', function () {

        it('should be return object of Collection ', function () {
            expect(collection.create() instanceof collection.Collection)
                .toEqual(true);
        });

    });

    describe('.Collection', function () {

        beforeEach(function () {
            this.entity1 = {foo: 1, bar: "val"};
            this.entity2 = {a: 2, b: "pow"};
            this.entity3 = {n: 3, m: 5};
            this.entity4 = {bar: 4, foo: "whe"};
            this.entity5 = {"0": 5, "4": "mar"};

            this.emptyCollection = collection.create();

            this.simpleCollection = collection.create();
            this.simpleCollection._data["obj1"] = this.entity1;

            this.middleCollection = collection.create();
            this.middleCollection._data["obj1"] = this.entity1;
            this.middleCollection._data["obj2"] = this.entity2;
            this.middleCollection._data["obj3"] = this.entity3;

            this.hardCollection = collection.create();
            this.hardCollection._data["obj1"] = this.entity1;
            this.hardCollection._data["obj2"] = this.entity2;
            this.hardCollection._data["obj3"] = this.entity3;
            this.hardCollection._data["obj4"] = this.entity4;
            this.hardCollection._data["obj5"] = this.entity5;

        });

        describe('.set()', function () {

            it('without params, should throw error', function () {
                var self = this;

                expect(function () { self.testCollection.set() })
                    .toThrow(new Error("Param 'key' is not defined!"));
            });

            it('without second param, should throw error', function () {
                var self = this;

                expect(function () {self.testCollection.set(0)})
                    .toThrow(new Error("Param 'entity' is not defined!"));
                expect(function () {self.testCollection.set("some_key")})
                    .toThrow(new Error("Param 'entity' is not defined!"));
            });

            it('should return undefined when setted in empty place', function () {

                expect(this.emptyCollection.set("obj1", this.entity1))
                    .toBeUndefined();
                expect(this.emptyCollection._data)
                    .toEqual({"obj1": this.entity1});
            });

            it('should return previous when setted in exists place', function () {

                expect(this.simpleCollection.set("obj1", this.entity2))
                    .toEqual(this.entity1);
                expect(this.simpleCollection._data)
                    .toEqual({"obj1": this.entity2});
            });

            it('should return undefined when setted in empty place second entity', function () {

                expect(this.simpleCollection.set("obj2", this.entity2))
                    .toBeUndefined();
                expect(this.simpleCollection._data)
                    .toEqual({
                        "obj1": this.entity1,
                        "obj2": this.entity2
                    });
            });

        });

        describe('.add()', function () {

            it('should return self object when setted in empty place', function () {

                expect(this.emptyCollection.add("obj1", this.entity1))
                    .toEqual(this.entity1);
                expect(this.emptyCollection._data)
                    .toEqual({"obj1": this.entity1});
            });

            it('should throw error when key exists', function () {
                var self = this;

                expect(function () {self.simpleCollection.add("obj1", self.entity2)})
                    .toThrow(new Error("Entity with key 'obj1' already exists!"));
            });
        });

        describe('.get()', function () {

            it('should return object by key', function () {
                expect(this.simpleCollection.get('obj1'))
                    .toEqual(this.entity1);
            });

            it('should return undefined when key not exists', function () {
                expect(this.simpleCollection.get('obj2'))
                    .toBeUndefined();
            });
        });

        describe('.each()', function () {

            it('should set correct params', function () {
                var self = this;
                this.simpleCollection.each(function (key, entity, index, collection) {
                    expect(key).toEqual('obj1');
                    expect(entity).toEqual(self.entity1);
                    expect(index).toEqual(0);
                    expect(collection).toEqual(self.simpleCollection._data);
                })
            });

            it('should handle all elements of collection', function () {
                var result = [];

                this.hardCollection.each(function (key, entity, index, collection) {
                    result.push(entity);
                });

                expect(result.length).toEqual(5);
            });
        });

        describe('.remove()', function () {

            it('should throw error when key is not defined', function () {
                var self = this;

                expect(function () { self.simpleCollection.remove() })
                    .toThrow(new Error("Param 'key' is not defined!"));
            });

            it('should return true and remove object', function () {

                expect(this.simpleCollection.remove("obj1"))
                    .toEqual(true);
                expect(this.simpleCollection._data)
                    .toEqual({});
            });

            it('should return false, and nothing to delete', function () {

                expect(this.simpleCollection.remove("obj2"))
                    .toEqual(false);
            });
        });

        describe('.length()', function () {
            it('should return 0', function () {
                expect(this.emptyCollection.length())
                    .toEqual(0);
            });

            it('should return 1', function () {
                expect(this.simpleCollection.length())
                    .toEqual(1);
            });

            it('should return 3', function () {
                expect(this.middleCollection.length())
                    .toEqual(3);
            });

            it('should return 5', function () {
                expect(this.hardCollection.length())
                    .toEqual(5);
            });
        });

        describe('.getCollection()', function () {

            it('should return empty object', function () {
                expect(this.emptyCollection.getCollection())
                    .toEqual({});
            });

            it('should return object with one object', function () {
                expect(this.simpleCollection.getCollection())
                    .toEqual({"obj1": this.entity1});
            });

            it('should return object with thee objects', function () {
                expect(this.middleCollection.getCollection())
                    .toEqual({
                        "obj1": this.entity1,
                        "obj2": this.entity2,
                        "obj3": this.entity3
                    });
            });

        });

        describe('.clear()', function () {
            it('should cleared collection', function () {
                this.middleCollection.clear();

                expect(this.middleCollection._data).toEqual({});
            });
        });

    });

});
