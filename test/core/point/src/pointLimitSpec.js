describe('PointLimit service', function () {

    beforeEach(function (done) {
        var self = this;
        module('app');

        inject(function (_pointLimit_) {
            self.pointLimit = _pointLimit_;

            done();
        });
    });

    describe('PointLimit', function () {

        beforeEach(function () {
            this.point1 = this.pointLimit.create(0, 0);
            this.point2 = this.pointLimit.create(-1, -4);
            this.point3 = this.pointLimit.create(3, 2);
            this.point4 = this.pointLimit.create(5, 4);
            this.point5 = this.pointLimit.create(3, 6);
            this.point6 = this.pointLimit.create(1, 1);

            this.pointMin = this.pointLimit.create(1, 1);
            this.pointMax = this.pointLimit.create(10, 15);
            this.pointLim = this.pointLimit.create(4, 5, this.pointMin, this.pointMax);

        });

        describe('constructor', function () {

            it('should create new point object', function () {
                var point = this.pointLimit.create(4, 5);

                expect(point instanceof this.pointLimit.PointLimit)
                    .toEqual(true);
                expect(point.x)
                    .toEqual(4);
                expect(point.y)
                    .toEqual(5);
                expect(point.pointMin)
                    .toEqual(null);
                expect(point.pointMax)
                    .toEqual(null);
            });

            it('should create new point object with limit', function () {
                var point = this.pointLimit.create(4, 3, this.point6, this.point4);

                expect(point instanceof this.pointLimit.PointLimit)
                    .toEqual(true);
                expect(point.x)
                    .toEqual(4);
                expect(point.y)
                    .toEqual(3);
                expect(point.pointMin)
                    .toEqual(this.point6);
                expect(point.pointMax)
                    .toEqual(this.point4);
            });

            it('should create new point object with limit correct coord', function () {
                var point = this.pointLimit.create(4, 5, this.point6, this.point3);

                expect(point instanceof this.pointLimit.PointLimit)
                    .toEqual(true);
                expect(point.x)
                    .toEqual(3);
                expect(point.y)
                    .toEqual(2);
                expect(point.pointMin)
                    .toEqual(this.point6);
                expect(point.pointMax)
                    .toEqual(this.point3);
            });
        });

        describe('.moveIn()', function () {

            it('should moved point in absolute', function () {
                this.pointLim.moveIn(6, 7);

                expect(this.pointLim.x)
                    .toEqual(6);
                expect(this.pointLim.y)
                    .toEqual(7);
            });

            it('should moved point in absolute with correct top left', function () {
                this.pointLim.moveIn(0, 0);

                expect(this.pointLim.x)
                    .toEqual(this.pointMin.x);
                expect(this.pointLim.y)
                    .toEqual(this.pointMin.y);
            });

            it('should moved point in absolute with correct bottom right', function () {
                this.pointLim.moveIn(20, 25);

                expect(this.pointLim.x)
                    .toEqual(this.pointMax.x);
                expect(this.pointLim.y)
                    .toEqual(this.pointMax.y);
            });

            it('should moved point in absolute form string', function () {
                this.pointLim.moveIn('-2', '-5');

                expect(this.pointLim.x)
                    .toEqual(this.pointMin.x);
                expect(this.pointLim.y)
                    .toEqual(this.pointMin.y);
            });

        });

        describe('.moveOn()', function () {

            it('should move point in relative', function () {
                this.pointLim.moveOn(1, 4);

                expect(this.pointLim.x)
                    .toEqual(5);
                expect(this.pointLim.y)
                    .toEqual(9);
            });

            it('should move point in relative correct top left', function () {
                this.pointLim.moveOn(-10, -15);

                expect(this.pointLim.x)
                    .toEqual(this.pointMin.x);
                expect(this.pointLim.y)
                    .toEqual(this.pointMin.y);
            });

            it('should move point in relative with correct bottom right', function () {
                this.pointLim.moveIn(20, 25);

                expect(this.pointLim.x)
                    .toEqual(this.pointMax.x);
                expect(this.pointLim.y)
                    .toEqual(this.pointMax.y);
            });

        });

        describe('.setPoint()', function () {

            it('should set current point', function () {
                this.pointLim.setPoint(this.point5);

                expect(this.pointLim.x)
                    .toEqual(this.point5.x);
                expect(this.pointLim.y)
                    .toEqual(this.point5.y);
            });

        });
    });
});
