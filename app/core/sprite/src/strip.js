app.service('strip', ['$http', '$q', 'spriteImage', function ($http, $q, spriteImage) {
    var cache = {};

    this.load = function (fileName) {
        if (!cache[fileName]) {
            cache[fileName] = $q.defer();

            $http.post('/sprite', {fileName: fileName}).then(function (response) {
                var width;

                var lines = response.data.split('\n').map(function (line) {
                    if (!width) width = line.length - 1;
                    return line.slice(0, width);
                });

                cache[fileName].resolve(lines);
            });
        }
        return cache[fileName].promise;
    };

    this.Strip = function (name, fullStripArray, countFrames, countDir, width, height, centerX, centerY) {
        this.name = name;
        this.images = [];
        this.frameCount = countFrames;
        this.dirCount = countDir;

        var offsetFrame = 0;

        for (var i = 0; i < this.dirCount; i++) {
            this.images[i] = [];
            for (var j = 0; j < this.frameCount; j++) {
                var imageString = fullStripArray.slice(offsetFrame, offsetFrame + height).join('');
                this.images[i][j] = spriteImage.create(imageString, width, height, centerX, centerY);
                offsetFrame += height;
            }
        }

        this.speed = 0;
        this.repeat = false;
    };

    this.Strip.prototype.dirframe = function (dir, frame) {
        dir = dir >= this.dirCount-1 ? this.dirCount-1 : dir;
        frame = frame >= this.frameCount-1 ? this.frameCount-1 : frame;
        return this.images[dir][frame];
    };

}]);
