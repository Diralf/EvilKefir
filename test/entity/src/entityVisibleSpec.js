describe('entityVisible', function () {

    beforeEach(function () {
        var self = this;
        module('app');

        inject(function (_entityVisible_) {
            self.entityVisible = _entityVisible_;
        });
    });


    describe('EntityVisible', function () {

        beforeEach(function () {
            this.image = {
                image: '1112 23 3444',
                width: 3,
                height: 4,
                centerX: 1,
                centerY: 3
            };

            this.sprite = {
                spriteImage: this.image
            };

            this.entity1 = this.entityVisible.create(5, 5, this.sprite);
            this.entity2 = this.entityVisible.create(6, 6, this.sprite);

            this.grid = [
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.'],
                ['.','.','.','.','.','.','.','.']
            ];

            this.context = {
                grid: this.grid,
                x: 0,
                y: 0,
                w: 8,
                h: 8
            }
        });

        describe('.draw()', function () {

            it('should added on context', function () {
                this.entity1.draw(this.context);

                expect(this.context.grid)
                    .toEqual([
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','1','1','1','.'],
                        ['.','.','.','.','2','.','2','.'],
                        ['.','.','.','.','3','.','3','.'],
                        ['.','.','.','.','4','4','4','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.']
                    ]);
            });

            it('should correct add second entity', function () {
                this.entity1.draw(this.context);
                this.entity2.draw(this.context);

                expect(this.context.grid)
                    .toEqual([
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','1','1','1','.'],
                        ['.','.','.','.','2','1','1','1'],
                        ['.','.','.','.','3','2','3','2'],
                        ['.','.','.','.','4','3','4','3'],
                        ['.','.','.','.','.','4','4','4'],
                        ['.','.','.','.','.','.','.','.']
                    ]);
            });

            it('should added on context on border rigth bottom', function () {
                this.entity1.x = 7;
                this.entity1.y = 8;
                this.entity1.draw(this.context);

                expect(this.context.grid)
                    .toEqual([
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','1','1'],
                        ['.','.','.','.','.','.','2','.'],
                        ['.','.','.','.','.','.','3','.']
                    ]);
            });

            it('should added on context on border left top', function () {
                this.entity1.x = 0;
                this.entity1.y = 1;
                this.entity1.draw(this.context);

                expect(this.context.grid)
                    .toEqual([
                        ['.','3','.','.','.','.','.','.'],
                        ['4','4','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.']
                    ]);
            });

            it('should added on context with offset context', function () {
                this.context.x = 2;
                this.context.y = 2;
                this.entity1.draw(this.context);

                expect(this.context.grid)
                    .toEqual([
                        ['.','.','1','1','1','.','.','.'],
                        ['.','.','2','.','2','.','.','.'],
                        ['.','.','3','.','3','.','.','.'],
                        ['.','.','4','4','4','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.'],
                        ['.','.','.','.','.','.','.','.']
                    ]);
            });
        });

    });
});
