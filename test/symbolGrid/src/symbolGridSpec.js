describe('symbolGrid', function () {

    beforeEach(function (done) {
        var self = this;
        module('app');

        inject(function (_symbolGrid_) {
            self.symbolGrid = _symbolGrid_;

            done();
        });
    });

    describe('.create()', function () {

        it('should be return object of Collection ', function () {
            expect(this.symbolGrid.create() instanceof this.symbolGrid.SymbolGrid)
                .toEqual(true);
        });
    });

    describe('.SymbolGrid', function () {

        beforeEach(function () {
            this.emptyGrid = this.symbolGrid.create();
            this.stringArray = [
                    '1234567',
                    '!@#$%^&',
                    'qwertyu',
                    'asdfghj',
                    'zxcvbnm',
                    'QWERTYU',
                    'ASDFGHJ'
                ];
            this.text = '1234567\n!@#$%^&\nqwertyu\nasdfghj\nzxcvbnm\nQWERTYU\nASDFGHJ';
        });

        describe('.getRect', function () {

            beforeEach(function () {
                this.middleGrid = this.symbolGrid.create();

                this.middleGrid.data.push("1234567");
                this.middleGrid.data.push("!@#$%^&");
                this.middleGrid.data.push("qwertyu");
                this.middleGrid.data.push("asdfghj");
                this.middleGrid.data.push("zxcvbnm");
                this.middleGrid.data.push("QWERTYU");
                this.middleGrid.data.push("ASDFGHJ");
                this.middleGrid.width = 7;
                this.middleGrid.height = 7;

            });

            it('should be return full rect', function () {
                expect(this.middleGrid.getRect(1, 2, 3, 4))
                    .toEqual([
                        'wer',
                        'sdf',
                        'xcv',
                        'WER'
                        ]);
            });

            it('should be return correct of rigth-bottom part', function () {
                expect(this.middleGrid.getRect(-1, -2, 4, 5))
                    .toEqual([
                        '123',
                        '!@#',
                        'qwe'
                        ]);
            });

            it('should be return correct of left-top part', function () {
                expect(this.middleGrid.getRect(4, 5, 10, 12))
                    .toEqual([
                        'TYU',
                        'GHJ'
                        ]);
            });

            it('should be return correct of center part', function () {
                expect(this.middleGrid.getRect(-3, -5, 30, 52))
                    .toEqual([
                        '1234567',
                        '!@#$%^&',
                        'qwertyu',
                        'asdfghj',
                        'zxcvbnm',
                        'QWERTYU',
                        'ASDFGHJ',
                        ]);
            });

            it('should be return full revert rect', function () {
                expect(this.middleGrid.getRect(4, 6, -2, -4))
                    .toEqual([
                        'fg',
                        'vb',
                        'RT',
                        'FG'
                        ]);
            });

            it('should be return empty array', function () {
                expect(this.middleGrid.getRect(-1, -2, -4, -5))
                    .toEqual([]);
            });

            it('should be return empty array', function () {
                expect(this.middleGrid.getRect(20, 30, 1, 2))
                    .toEqual([]);
            });

            it('should be return correct revert of rigth-bottom part', function () {
                expect(this.middleGrid.getRect(2, 2, -4, -5))
                    .toEqual([
                        '123',
                        '!@#',
                        'qwe'
                        ]);
            });

            it('should be return correct revert of left-top part', function () {
                expect(this.middleGrid.getRect(13, 16, -10, -12))
                    .toEqual([
                        'TYU',
                        'GHJ'
                        ]);
            });

            it('should be return correct revert of center part', function () {
                expect(this.middleGrid.getRect(12, 15, -17, -20))
                    .toEqual([
                        '1234567',
                        '!@#$%^&',
                        'qwertyu',
                        'asdfghj',
                        'zxcvbnm',
                        'QWERTYU',
                        'ASDFGHJ',
                        ]);
            });
        });

        describe('initFromText', function () {

            it('should inited from text', function () {

                expect(this.emptyGrid.initFromText(this.text))
                    .toEqual([
                        '1234567',
                        '!@#$%^&',
                        'qwertyu',
                        'asdfghj',
                        'zxcvbnm',
                        'QWERTYU',
                        'ASDFGHJ'
                    ])
            });
        });

        describe('init', function () {

            it('should be inited as StringArray', function () {
                this.emptyGrid.init(this.stringArray);
                expect(this.emptyGrid.data)
                    .toEqual([
                        '1234567',
                        '!@#$%^&',
                        'qwertyu',
                        'asdfghj',
                        'zxcvbnm',
                        'QWERTYU',
                        'ASDFGHJ'
                    ]);
            });

            it('should be inited as text', function () {
                this.emptyGrid.init(this.text);
                expect(this.emptyGrid.data)
                    .toEqual([
                        '1234567',
                        '!@#$%^&',
                        'qwertyu',
                        'asdfghj',
                        'zxcvbnm',
                        'QWERTYU',
                        'ASDFGHJ'
                    ]);
            });

            it('should throw error', function () {
                var self = this;

                expect(function () { self.emptyGrid.init(123) })
                    .toThrow(new Error("Start data is not correct type (number)!"));
            });

            it('should be inited size width and height', function () {
                this.emptyGrid.init(this.text);

                expect(this.emptyGrid.width)
                    .toEqual(7);
                expect(this.emptyGrid.height)
                    .toEqual(7);
            });

            it('should be inited as size 0', function () {
                this.emptyGrid.init([]);

                expect(this.emptyGrid.width)
                    .toEqual(0);
                expect(this.emptyGrid.height)
                    .toEqual(0);
            });

            it('should be inited size with min width', function () {
                this.emptyGrid.init([
                        '1234567',
                        '!@%^&',
                        'qwertyu',
                        'ahj',
                        'zxcvm',
                        'QWERTYU',
                        'ASDHJ'
                    ]);

                expect(this.emptyGrid.width)
                    .toEqual(3);
                expect(this.emptyGrid.height)
                    .toEqual(7);
            });
        });


    });
});
