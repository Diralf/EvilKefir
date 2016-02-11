describe('Point service', function () {

    beforeEach(function (done) {
        var self = this;
        module('app');

        inject(function (_point_) {
            self.point = _point_;

            done();
        });
    });

    describe('Point', function () {

        beforeEach(function () {
            this.point1 = this.point.create(0, 0);
            this.point2 = this.point.create(-1, -4);
            this.point3 = this.point.create(3, 2);
            this.point4 = this.point.create(5, 4);
            this.point5 = this.point.create(3, 6);
            this.point6 = this.point.create(1, 1);

        });

        describe('constructor', function () {

            it('should create new point object', function () {
                var point = this.point.create(4, 5);

                expect(point instanceof this.point.Point)
                    .toEqual(true);
                expect(point.x)
                    .toEqual(4);
                expect(point.y)
                    .toEqual(5);
            });
        });

        describe('.moveIn()', function () {

            it('should moved point in absolute', function () {
                this.point1.moveIn(7, 4);

                expect(this.point1.x)
                    .toEqual(7);
                expect(this.point1.y)
                    .toEqual(4);
            });

            it('should moved point in absolute form string', function () {
                this.point1.moveIn('7', '4');

                expect(this.point1.x)
                    .toEqual(7);
                expect(this.point1.y)
                    .toEqual(4);
            });

        });

        describe('.moveOn()', function () {

            it('should move point in relative', function () {
                this.point3.moveOn(1, 4);

                expect(this.point3.x)
                    .toEqual(4);
                expect(this.point3.y)
                    .toEqual(6);
            });

        });

        describe('.setPoint()', function () {

            it('should set current point', function () {
                this.point1.setPoint(this.point2);

                expect(this.point1.x)
                    .toEqual(-1);
                expect(this.point1.y)
                    .toEqual(-4);
            });

        });
    });
});
