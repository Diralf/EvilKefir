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
        var spaceAreaX = '';

        /*if (rect.ycells < 0) {
            var rY = -rect.ycells;
            var spaceArea = [];
            for (var i = 0; i < rY; i++) {
                spaceArea.push(new Array(rect.wcells).join(" "));
            }
            context.unshift(spaceArea);
        }



        if (rect.xcells < 0) {
            var rX = -rect.xcells;
            spaceAreaX = new Array(rX).join(" ");
        }
        */

        context = context.map(function (line) {
            return spaceAreaX + line.join('');
        });

        return context;
    };
}]);
