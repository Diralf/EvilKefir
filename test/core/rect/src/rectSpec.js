describe('Rect service', function () {

    beforeEach(function (done) {
        var self = this;
        module('app');

        inject(function (_rect_) {
            self.rect = _rect_;

            done();
        });
    });

    describe('constructor', function () {
        it('should be correct', function () {
            var rectTest = new this.rect.Rect(3, 5, 6, 4);

            expect(rectTest.place.x)
                .toEqual(3);
            expect(rectTest.place.y)
                .toEqual(5);
            expect(rectTest.size.x)
                .toEqual(6);
            expect(rectTest.size.y)
                .toEqual(4);

            expect(rectTest.x)
                .toEqual(3);
            expect(rectTest.y)
                .toEqual(5);
            expect(rectTest.w)
                .toEqual(6);
            expect(rectTest.h)
                .toEqual(4);

            rectTest.x = 9;
            rectTest.y = 10;
            rectTest.w = 11;
            rectTest.h = 12;

            expect(rectTest.x)
                .toEqual(9);
            expect(rectTest.y)
                .toEqual(10);
            expect(rectTest.w)
                .toEqual(11);
            expect(rectTest.h)
                .toEqual(12);

        });
    });
});
