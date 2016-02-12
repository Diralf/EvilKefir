describe('collision service', function () {

    beforeEach(function (done) {
        var self = this;
        module('app');

        inject(function (_collision_) {
            self.collision = _collision_;

            done();
        });
    });

    beforeEach(function () {
        this.point1 = {x: 3, y: 4};
        this.point2 = {x: 10, y: 15};

        this.rect1 = {x: 1, y: 2, w: 5, h: 7};

        this.rectFix = {x: 5, y: 5, w: 5, h: 5};

        this.rectInterTL = {x: 3, y: 3, w: 5, h: 5};
        this.rectInterT = {x: 3, y: 3, w: 10, h: 5};
        this.rectInterTR = {x: 8, y: 3, w: 5, h: 5};
        this.rectInterR = {x: 8, y: 3, w: 5, h: 10};
        this.rectInterBR = {x: 8, y: 8, w: 5, h: 5};
        this.rectInterB = {x: 3, y: 8, w: 10, h: 5};
        this.rectInterBL = {x: 3, y: 8, w: 5, h: 5};
        this.rectInterL = {x: 3, y: 3, w: 5, h: 10};
        this.rectInterA = {x: 3, y: 3, w: 10, h: 10};

        this.rectIncludeSmall = {x: 6, y: 6, w: 3, h: 3};
        this.rectIncludeEqual = {x: 5, y: 5, w: 5, h: 5};

        this.rectOutLT = {x: 0, y: 0, w: 2, h: 2};
        this.rectOutLTR = {x: 0, y: 0, w: 15, h: 2};
        this.rectOutT = {x: 6, y: 0, w: 2, h: 2};
        this.rectOutTR = {x: 12, y: 0, w: 2, h: 2};
        this.rectOutTRB = {x: 12, y: 0, w: 2, h: 15};
        this.rectOutR = {x: 12, y: 6, w: 2, h: 2};
        this.rectOutBR = {x: 12, y: 12, w: 2, h: 2};
        this.rectOutLBR = {x: 0, y: 12, w: 15, h: 2};
        this.rectOutB = {x: 6, y: 12, w: 2, h: 2};
        this.rectOutLB = {x: 0, y: 12, w: 2, h: 2};
        this.rectOutTLB = {x: 0, y: 0, w: 2, h: 15};
        this.rectOutL = {x: 0, y: 6, w: 2, h: 2};

    });

    describe('pointToRect', function () {
        it('should be inside', function () {
            expect(this.collision.pointToRect(this.point1, this.rect1))
                .toEqual(true);
        });

        it('should be outside', function () {
            expect(this.collision.pointToRect(this.point2, this.rect1))
                .toEqual(false);
        });
    });

    describe('rectIntersectRect', function () {
        it('should intersect top left', function () {
            expect(this.collision.rectIntersectRect(this.rectInterTL, this.rectFix))
                .toEqual(true);
        });

        it('should intersect top', function () {
            expect(this.collision.rectIntersectRect(this.rectInterT, this.rectFix))
                .toEqual(true);
        });

        it('should intersect top right', function () {
            expect(this.collision.rectIntersectRect(this.rectInterTR, this.rectFix))
                .toEqual(true);
        });

        it('should intersect right', function () {
            expect(this.collision.rectIntersectRect(this.rectInterR, this.rectFix))
                .toEqual(true);
        });

        it('should intersect bottom right', function () {
            expect(this.collision.rectIntersectRect(this.rectInterBR, this.rectFix))
                .toEqual(true);
        });

        it('should intersect bottom', function () {
            expect(this.collision.rectIntersectRect(this.rectInterB, this.rectFix))
                .toEqual(true);
        });

        it('should intersect bottom left', function () {
            expect(this.collision.rectIntersectRect(this.rectInterBL, this.rectFix))
                .toEqual(true);
        });

        it('should intersect left', function () {
            expect(this.collision.rectIntersectRect(this.rectInterL, this.rectFix))
                .toEqual(true);
        });

        it('should intersect all', function () {
            expect(this.collision.rectIntersectRect(this.rectInterA, this.rectFix))
                .toEqual(true);
        });

        it('should intersect include small', function () {
            expect(this.collision.rectIntersectRect(this.rectIncludeSmall, this.rectFix))
                .toEqual(true);
        });

        it('should intersect include equal', function () {
            expect(this.collision.rectIntersectRect(this.rectIncludeEqual, this.rectFix))
                .toEqual(true);
        });

        it('should out left top', function () {
            expect(this.collision.rectIntersectRect(this.rectOutLT, this.rectFix))
                .toEqual(false);
        });

        it('should out left top right', function () {
            expect(this.collision.rectIntersectRect(this.rectOutLTR, this.rectFix))
                .toEqual(false);
        });

        it('should out top', function () {
            expect(this.collision.rectIntersectRect(this.rectOutT, this.rectFix))
                .toEqual(false);
        });

        it('should out top right', function () {
            expect(this.collision.rectIntersectRect(this.rectOutTR, this.rectFix))
                .toEqual(false);
        });

        it('should out top right bottom', function () {
            expect(this.collision.rectIntersectRect(this.rectOutTRB, this.rectFix))
                .toEqual(false);
        });

        it('should out right', function () {
            expect(this.collision.rectIntersectRect(this.rectOutR, this.rectFix))
                .toEqual(false);
        });

        it('should out bottom right', function () {
            expect(this.collision.rectIntersectRect(this.rectOutBR, this.rectFix))
                .toEqual(false);
        });

        it('should out left bottom right', function () {
            expect(this.collision.rectIntersectRect(this.rectOutLBR, this.rectFix))
                .toEqual(false);
        });

        it('should out bottom', function () {
            expect(this.collision.rectIntersectRect(this.rectOutB, this.rectFix))
                .toEqual(false);
        });

        it('should out left bottom', function () {
            expect(this.collision.rectIntersectRect(this.rectOutLB, this.rectFix))
                .toEqual(false);
        });

        it('should out top left bottom', function () {
            expect(this.collision.rectIntersectRect(this.rectOutTLB, this.rectFix))
                .toEqual(false);
        });

        it('should out left', function () {
            expect(this.collision.rectIntersectRect(this.rectOutL, this.rectFix))
                .toEqual(false);
        });
    });

    describe('rectIncludeRect', function () {
        it('should Include  top left', function () {
            expect(this.collision.rectIncludeRect(this.rectInterTL, this.rectFix))
                .toEqual(false);
        });

        it('should Include  top', function () {
            expect(this.collision.rectIncludeRect(this.rectInterT, this.rectFix))
                .toEqual(false);
        });

        it('should Include  top right', function () {
            expect(this.collision.rectIncludeRect(this.rectInterTR, this.rectFix))
                .toEqual(false);
        });

        it('should Include  right', function () {
            expect(this.collision.rectIncludeRect(this.rectInterR, this.rectFix))
                .toEqual(false);
        });

        it('should Include  bottom right', function () {
            expect(this.collision.rectIncludeRect(this.rectInterBR, this.rectFix))
                .toEqual(false);
        });

        it('should Include  bottom', function () {
            expect(this.collision.rectIncludeRect(this.rectInterB, this.rectFix))
                .toEqual(false);
        });

        it('should Include  bottom left', function () {
            expect(this.collision.rectIncludeRect(this.rectInterBL, this.rectFix))
                .toEqual(false);
        });

        it('should Include  left', function () {
            expect(this.collision.rectIncludeRect(this.rectInterL, this.rectFix))
                .toEqual(false);
        });

        it('should Include  all', function () {
            expect(this.collision.rectIncludeRect(this.rectInterA, this.rectFix))
                .toEqual(false);
        });

        it('should Include  include small', function () {
            expect(this.collision.rectIncludeRect(this.rectIncludeSmall, this.rectFix))
                .toEqual(true);
        });

        it('should Include  include equal', function () {
            expect(this.collision.rectIncludeRect(this.rectIncludeEqual, this.rectFix))
                .toEqual(true);
        });

        it('should Include out left top', function () {
            expect(this.collision.rectIncludeRect(this.rectOutLT, this.rectFix))
                .toEqual(false);
        });

        it('should Include out left top right', function () {
            expect(this.collision.rectIncludeRect(this.rectOutLTR, this.rectFix))
                .toEqual(false);
        });

        it('should Include out top', function () {
            expect(this.collision.rectIncludeRect(this.rectOutT, this.rectFix))
                .toEqual(false);
        });

        it('should Include out top right', function () {
            expect(this.collision.rectIncludeRect(this.rectOutTR, this.rectFix))
                .toEqual(false);
        });

        it('should Include out top right bottom', function () {
            expect(this.collision.rectIncludeRect(this.rectOutTRB, this.rectFix))
                .toEqual(false);
        });

        it('should Include out right', function () {
            expect(this.collision.rectIncludeRect(this.rectOutR, this.rectFix))
                .toEqual(false);
        });

        it('should Include out bottom right', function () {
            expect(this.collision.rectIncludeRect(this.rectOutBR, this.rectFix))
                .toEqual(false);
        });

        it('should Include out left bottom right', function () {
            expect(this.collision.rectIncludeRect(this.rectOutLBR, this.rectFix))
                .toEqual(false);
        });

        it('should Include out bottom', function () {
            expect(this.collision.rectIncludeRect(this.rectOutB, this.rectFix))
                .toEqual(false);
        });

        it('should Include out left bottom', function () {
            expect(this.collision.rectIncludeRect(this.rectOutLB, this.rectFix))
                .toEqual(false);
        });

        it('should Include out top left bottom', function () {
            expect(this.collision.rectIncludeRect(this.rectOutTLB, this.rectFix))
                .toEqual(false);
        });

        it('should Include out left', function () {
            expect(this.collision.rectIncludeRect(this.rectOutL, this.rectFix))
                .toEqual(false);
        });
    });
});
