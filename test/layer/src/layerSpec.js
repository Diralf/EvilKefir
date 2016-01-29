describe('layer', function () {

    var layer, collection;
    var injector;

    beforeEach(function (done) {
        module('app');

        inject(function (_layer_, _collection_) {
            layer = _layer_;
            collection = _collection_;

            done();
        });
    });

    describe('.create()', function () {

        it('should be create object of type Layer', function () {
            expect(layer.create() instanceof layer.Layer)
                .toEqual(true);
        });
    });

    describe('Layer', function () {

        beforeEach(function () {
            this.entity1 = {x: 0, y: 0, name: "val"};
            this.entity2 = {x: 5, y: 0, a: 2, b: "pow"};
            this.entity3 = {x: 5, y: 5, n: 3, m: 5};
            this.entity4 = {x: 0, y: 5, bar: 4, foo: "whe"};
            this.entity5 = {x: 3, y: 3, "0": 5, "4": "mar"};
            this.entity6 = {"0": 5, "4": "mar"};
            this.entity7 = {x: 4, y: 7, "0": 5, "4": "mar"};

            this.emptyLayer = layer.create();

            this.simpleLayer = layer.create();
            this.simpleLayer._data._data["0"] = collection.create();
            this.simpleLayer._data._data["0"]._data["0"] = this.entity1;

            this.middleLayer = layer.create();
            this.middleLayer._data._data["0"] = collection.create();
            this.middleLayer._data._data["5"] = collection.create();
            this.middleLayer._data._data["0"]._data["0"] = this.entity1;
            this.middleLayer._data._data["0"]._data["5"] = this.entity2;
            this.middleLayer._data._data["5"]._data["5"] = this.entity3;

            this.hardLayer = layer.create();
            this.hardLayer._data._data["0"] = collection.create();
            this.hardLayer._data._data["3"] = collection.create();
            this.hardLayer._data._data["5"] = collection.create();
            this.hardLayer._data._data["0"]._data["0"] = this.entity1; // 1
            this.hardLayer._data._data["0"]._data["5"] = this.entity2; // 2
            this.hardLayer._data._data["5"]._data["5"] = this.entity3; // 5
            this.hardLayer._data._data["5"]._data["0"] = this.entity4; // 4
            this.hardLayer._data._data["3"]._data["3"] = this.entity5; // 3

            this.thirdLayer = layer.create();
            this.thirdLayer._data._data["7"] = collection.create();
            this.thirdLayer._data._data["7"]._data["4"] = this.entity7;

        });

        describe('.add()', function () {

            it('should be added on current empty place and return self', function () {
                expect(this.emptyLayer.add(this.entity1, 1, 1))
                    .toEqual(this.entity1);
                expect(this.emptyLayer._data._data["1"]._data["1"])
                    .toEqual(this.entity1);
            });

            it('should be added on empty place own of entity', function () {
                expect(this.emptyLayer.add(this.entity1))
                    .toEqual(this.entity1);
                expect(this.emptyLayer._data._data["0"]._data["0"])
                    .toEqual(this.entity1);
            });

            it('should throw error when entity not have x/y property', function () {
                var self = this;

                expect(function() {self.emptyLayer.add(self.entity6)})
                    .toThrow(new Error("Param 'x' is not defined!"));
                expect(function() {self.emptyLayer.add(self.entity6, 3)})
                    .toThrow(new Error("Param 'y' is not defined!"));
            });

            it('should be added on current place in exists line and return self', function () {
                expect(this.simpleLayer.add(this.entity2, 8, 0))
                    .toEqual(this.entity2);
                expect(this.simpleLayer._data._data["0"]._data["8"])
                    .toEqual(this.entity2);
            });

            it('should be not added in exists place and return null', function () {
                expect(this.simpleLayer.add(this.entity2, 0, 0))
                    .toEqual(null);
                expect(this.simpleLayer._data._data["0"]._data["0"])
                    .toEqual(this.entity1);
            });
        });

        describe('.get()', function () {

            it('should be return entity', function () {
                expect(this.simpleLayer.get(0, 0))
                    .toEqual(this.entity1);
            });

            it('should be return undefined when line exists but missed entity', function () {
                expect(this.simpleLayer.get(1, 0))
                    .toBeUndefined()
            });

            it('should be return null when line missed', function () {
                expect(this.simpleLayer.get(1, 1))
                    .toBeNull()
            });
        });

        describe('.remove()', function () {

            it('should be remove entity by x/y and return true', function () {
                expect(this.middleLayer.remove(5, 0))
                    .toEqual(true);
                expect(this.middleLayer._data._data['0']._data['5'])
                    .toBeUndefined()
            });

            it('should be return false when place is empty', function () {
                expect(this.middleLayer.remove(7, 0))
                    .toEqual(false);
                expect(this.middleLayer.remove(7, 7))
                    .toEqual(false);
            });
        });

        describe('.layerEach()', function () {

            beforeEach(function () {
                var self = this;
                this.resultArray = [];
                this.someActions = function (x, y, entity,index) {
                    self.resultArray.push(entity);
                };
            });

            it('should be hundled all entity', function () {
                this.hardLayer.layerEach(this.someActions);

                expect(this.resultArray.length)
                    .toEqual(5);
            });

            it('should be hadled entity in correct order', function () {
                this.hardLayer.layerEach(this.someActions);

                expect(this.resultArray)
                    .toEqual([
                        this.entity1,
                        this.entity2,
                        this.entity5,
                        this.entity4,
                        this.entity3]
                    );
            });

            it('should be give correct params in callback', function () {
                var self = this;
                this.thirdLayer.layerEach(function (x, y, entity, index, layer) {
                    expect(x).toEqual(4);
                    expect(y).toEqual(7);
                    expect(entity).toEqual(self.entity7);
                    expect(index).toEqual(0);
                    expect(layer).toEqual(self.thirdLayer._data);
                });
            });
        });

        describe('.moveIn()', function () {

            it('should be moved current object, return 0', function () {
                expect(this.simpleLayer.moveIn(0, 0, 3, 5))
                    .toEqual(0);
                expect(this.simpleLayer._data._data['0']._data['0'])
                    .toBeUndefined();
                expect(this.simpleLayer._data._data['5']._data['3'])
                    .toEqual(this.entity1);
            });

            it('should not moved when place occupied, return 1', function () {
                expect(this.middleLayer.moveIn(0, 0, 5, 5))
                    .toEqual(1);
                expect(this.middleLayer._data._data['0']._data['0'])
                    .toEqual(this.entity1);
                expect(this.middleLayer._data._data['5']._data['5'])
                    .toEqual(this.entity3);
            });

            it('should not moved when entity not exists, return 2', function () {
                expect(this.simpleLayer.moveIn(1, 3, 9, 8))
                    .toEqual(2);
                expect(this.simpleLayer._data._data['3'])
                    .toBeUndefined();
            });
        });

        describe('.moveOn()', function () {

            it('should be moved current object in related x/y, return 0', function () {
                expect(this.middleLayer.moveOn(5, 5, 4, 7))
                    .toEqual(0);
                expect(this.middleLayer._data._data['5']._data['5'])
                    .toBeUndefined();
                expect(this.middleLayer._data._data['12']._data['9'])
                    .toEqual(this.entity3);
            });

            it('should be moved current object in related x/y, return 0', function () {
                expect(this.middleLayer.moveOn(5, 5, -7, -1))
                    .toEqual(0);
                expect(this.middleLayer._data._data['5']._data['5'])
                    .toBeUndefined();
                expect(this.middleLayer._data._data['4']._data['-2'])
                    .toEqual(this.entity3);
            });

            it('should not moved when place occupied, return 1', function () {
                expect(this.middleLayer.moveOn(5, 0, 0, 5))
                    .toEqual(1);
                expect(this.middleLayer._data._data['0']._data['5'])
                    .toEqual(this.entity2);
                expect(this.middleLayer._data._data['5']._data['5'])
                    .toEqual(this.entity3);
            });

            it('should not moved when entity not exists, return 2', function () {
                expect(this.simpleLayer.moveOn(1, 3, 9, 8))
                    .toEqual(2);
                expect(this.simpleLayer._data._data['3'])
                    .toBeUndefined();
            });
        });

        describe('.clear()', function () {

            it('should be clear layer', function () {
                this.hardLayer.clear();

                expect(this.hardLayer._data.length())
                    .toEqual(0);
            });
        });

        describe('.size()', function () {

            it('should be give count lines', function () {
                expect(this.hardLayer.size())
                    .toEqual(3);
            });

            it('should be give count entities for current line', function () {
                expect(this.hardLayer.size(5))
                    .toEqual(2);
            });

            it('should be give null entities for missed line', function () {
                expect(this.hardLayer.size(10))
                    .toBeNull();
            });
        });

        describe('.count()', function () {
            it('should be return count of all entities on layer', function () {
                expect(this.hardLayer.count())
                    .toEqual(5);
            });
        });

    });
});
