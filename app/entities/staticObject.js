(function () {
    'use strict';

    angular
        .module('app')
        .service('staticObject', staticObject);

    staticObject.$inject = ['entityVisible', 'message'];

    function staticObject(entityVisible, message) {

        this.StaticObject = StaticObject;
        this.StaticObject.prototype = Object.create(entityVisible.EntityVisible.prototype);

        ////////////////////////////////////////////

        function StaticObject(x, y, sprite, layer) {
            entityVisible.EntityVisible.call(this, x, y, sprite, layer);

            this.onMessage[message.LOOK] = function (/*params*/) {
                console.log('he look on me! I - ' + this.id);
                return true;
            };
        }
    }

})();
