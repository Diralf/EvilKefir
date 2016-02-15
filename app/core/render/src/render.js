/*
    основная идея:
    рендер должен принимать карту на входе со всеми слоями объектов и тайлов
    вызвать методы отрисовки всех объектов.
    выдать в результате массив с готовыми для отабражения строками.
*/
app.service('render', ['$log','mapService', 'viewportService', 'game', function ($log, mapService, viewportService, game) {
    var dialog = ' ╔═╗║╚═╝';

    this.draw = function () {
        var rect = viewportService;
        var context = mapService.currentLevel.tile.getRect(rect.pos.x,
                                                           rect.pos.y,
                                                           rect.dimension.x,
                                                           rect.dimension.y);
        var layers = mapService.currentLevel.layers;
        var areaExtra = 5;


        for (var i = 0; i < layers.length; i++) {
            layers[i].eachRect(
                rect.pos.x - areaExtra,
                rect.pos.y - areaExtra,
                rect.dimension.x + (areaExtra*2),
                rect.dimension.y + (areaExtra*2),
                function (keyX, keyY, entity) {
                    entity.draw({
                        grid: context,
                        x: rect.pos.x,
                        y: rect.pos.y,
                        w: rect.dimension.x,
                        h: rect.dimension.y
                    });
            });
        }

        context = context.map(function (line, index, arr) {
            if (game.dialog.show && index >= arr.length - game.dialog.height - 4) {
                var res = "";
                if (index == arr.length - game.dialog.height - 4) {
                    res = dialog[1] + (new Array(line.length-2).join(dialog[2])) + dialog[3];
                } else if (index == arr.length - 5) {
                    res = dialog[5] + (new Array(line.length-2).join(dialog[2])) + dialog[7];
                } else if (index < arr.length - 5) {
                    res = dialog[4] + (new Array(line.length-2).join(' ')) + dialog[4];
                } else {
                    res = (new Array(line.length).join(' '));
                }
                return res;
            }
            return line.join('');
        });

        return context;
    };
}]);
