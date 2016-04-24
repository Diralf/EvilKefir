(function () {
    'use strict';

    angular
        .module('app')
        .service('strip', strip);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    strip.$inject = ['$http', '$q', 'spriteImage'];

    function strip($http, $q, spriteImage) {
        var cache = {};

        this.load = load;

        this.Strip = Strip;

        this.Strip.prototype.dirframe = dirframe;

        ///////////////////////////////////////////

        function load(fileName) {
            if (!cache[fileName]) {
                cache[fileName] = $q.defer();

                $http.post('/sprite', {fileName: fileName}).then(function (response) {

                    var lines = response.data.split('\n').map(function (line) {
                        return line.replace(new RegExp(String.fromCharCode(13), 'g'), '');
                    });

                    cache[fileName].resolve(lines);
                });
            }
            return cache[fileName].promise;
        }

        function Strip(name, fullStripArray, countFrames, countDir, width, height, centerX, centerY) {
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
        }

        function dirframe(dir, frame) {
            dir = dir >= this.dirCount-1 ? this.dirCount-1 : dir;
            frame = frame >= this.frameCount-1 ? this.frameCount-1 : frame;
            return this.images[dir][frame];
        }

    }

})();
