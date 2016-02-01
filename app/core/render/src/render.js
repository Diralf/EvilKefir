/*
    основная идея:
    рендер должен принимать карту на входе со всеми слоями объектов и тайлов
    вызвать методы отрисовки всех объектов.
    выдать в результате массив с готовыми для отабражения строками.
*/
app.service('render', ['mapService', 'viewportService', function (mapService, viewportService) {
    this.draw = function () {
        var rect = viewportService;
        var context = mapService.currentLevel.tile.getRect(rect.xcells, rect.ycells, rect.wcells, rect.hcells);

        var line;

        for (var i = 0; i < rect.hcells; i++) {
            line = "";
            for (var j = 0; j < rect.wcells; j++) {
                var obj = mapService.currentLevel.layers[0].get(j, i);
                line += obj ? obj.sprite.image() : context[i][j];
            }
            context[i] = line;
        }


        return context;
    };
}]);
