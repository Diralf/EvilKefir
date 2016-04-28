(function () {
    'use strict';

    angular
        .module('app')
        .config(paperJSConfig);

    paperJSConfig.$inject = [];

    function paperJSConfig () {
        paper.install(window);
    }

})();