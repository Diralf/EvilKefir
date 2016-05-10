(function () {
    'use strict';

    angular
        .module('app')
        .service('characterControl', characterControl);

    characterControl.$inject = ['keyboard', 'On', '$http'];

    function characterControl(keyboard, On, $http) {
        var self = this;
        var keyHandlers = {};
        var keymap;

        this.on = new On();

        this.init = init;

        // TODO сделать возможность смены клавиш. Для этого понадобится сохранять листенеры для их удаления.

        /////////////////////////////////////////////////

        function init() {

            return $http.get('app/vars.json').then(function (result) {
                keymap = result.data.keymap;
                _.forEach(keymap, function (item) {
                    keyHandlers[item.key] = addHandler(item.key, item.event, item.params);
                });
                console.log(keymap);
                console.log(keyHandlers);
            });

        }

        function addHandler(key, event, params) {
            return keyboard.on.event(key, function (key, evt) {
                self.on.emit(event, params, key, evt);
            });
        }

    }

})();
