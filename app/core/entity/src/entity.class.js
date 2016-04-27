(function () {
    'use strict';

    angular
        .module('app')
        .factory('Entity', entity);

    entity.$inject = ['Collection'];

    function entity(Collection) {
        var validID = 0;

        var Entity = classEntity;
        Entity.prototype.handleMessage = handleMessage;
        Entity.prototype.step = step;
        Entity.prototype.die = die;

        Entity.entityCollection = new Collection();

        return Entity;

        ////////////////////////////////////////////////

        function classEntity() {
            this.id = validID;
            validID++;
            this.onMessage = {};

            Entity.entityCollection.add(this.id, this);
        }

        /**
         * в объект this.onMessage добавляется свойство
         *  имя которого есть type сообщения
         *  само свойство функция котороя обрабатывает сообщение данного типа
         *  в параметрах объект params
         *
         *  из вне вызывается метод handleMessage(type, params)
         * @param type
         */
        function handleMessage(type) {
            if (this.onMessage.hasOwnProperty(type)) {
                return this.onMessage[type].apply(this, arguments);
            }

            return false;
        }

        function step() {

        }

        function die() {
            Entity.entityCollection.remove(this.id);
        }

    }

})();
