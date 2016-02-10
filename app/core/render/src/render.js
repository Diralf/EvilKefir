/*
    основная идея:
    рендер должен принимать карту на входе со всеми слоями объектов и тайлов
    вызвать методы отрисовки всех объектов.
    выдать в результате массив с готовыми для отабражения строками.
*/
app.service('render', ['$log','mapService', 'viewportService', function ($log, mapService, viewportService) {
    this.draw = function () {
        var rect = viewportService;
        var context = mapService.currentLevel.tile.getRect(rect.xcells, rect.ycells, rect.wcells, rect.hcells);
        var layers = mapService.currentLevel.layers;
        var areaExtra = 5;


        for (var i = 0; i < layers.length; i++) {
            layers[i].eachRect(
                rect.xcells - areaExtra,
                rect.ycells - areaExtra,
                rect.wcells + (areaExtra*2),
                rect.hcells + (areaExtra*2),
                function (keyX, keyY, entity) {
                    entity.draw({
                        grid: context,
                        x: rect.xcells,
                        y: rect.ycells,
                        w: rect.wcells,
                        h: rect.hcells
                    });
            });
        }

        context = context.map(function (line) {
            return line.join('');
        });

        return context;
    };
}]);
