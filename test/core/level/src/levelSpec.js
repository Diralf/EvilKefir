describe('level', function () {

    beforeEach(function (done) {
        var self = this;
        module('app');

        inject(function (_level_, _layer_) {
            self.level = _level_;
            self.layer = _layer_;

            done();
        });
    });

    describe('.create()', function () {

        it('should create level', function () {
            expect(this.level.create() instanceof this.level.Level)
                .toEqual(true);
        });

        it('should create level with current layers', function () {
            var level = this.level.create(4);

            expect(level.layers)
                .toEqual([
                    this.layer.create(),
                    this.layer.create(),
                    this.layer.create(),
                    this.layer.create()
                ])
        });

        it('should create level with default layers', function () {
            var level = this.level.create();

            expect(level.layers)
                .toEqual([
                    this.layer.create(),
                    this.layer.create(),
                    this.layer.create()
                ])
        });
    });

});
