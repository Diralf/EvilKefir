(function () {
    'use strict';

    angular
        .module('app')
        .run(initializationRun);

    initializationRun.$inject = ['ppReady', 'characterControl', 'On'];

    function initializationRun (ppReady, characterControl, On) {
        var on = new On();
        var raster;

        ppReady.isReady.then(function () {
            raster = new Raster('assets/pixel/hero.png');
            raster.position = view.center;
            on.emit('start', 'hello');
        });

        characterControl.init();

        characterControl.on.event('move', function () {
            console.log(arguments);
        });

        setTimeout(function () {
            on.emit('finish', 'yep!');
        }, 5000);

        on.event('start', function () {
           console.log('probably works', arguments);
        });

        on.event('finish', function () {
            console.log('yes, it works', arguments);
        });

    }

})();
