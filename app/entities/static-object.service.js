(function () {
    'use strict';

    angular
        .module('app')
        .service('staticObject', staticObject);

    staticObject.$inject = ['EntityVisible', 'message'];

    function staticObject(EntityVisible, message) {

        this.StaticObject = StaticObject;
        this.StaticObject.prototype = Object.create(EntityVisible.prototype);

        ////////////////////////////////////////////

        function StaticObject(x, y, sprite, layer) {
            EntityVisible.call(this, x, y, sprite, layer);

            this.onMessage[message.LOOK] = function (/*params*/) {
                console.log('he look on me! I - ' + this.id);
                return true;
            };
        }
    }

})();
