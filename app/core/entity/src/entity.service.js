(function () {
    'use strict';

    angular
        .module('app')
        .service('entity', entity);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    entity.$inject = ['collection'];

    function entity(collection) {
        var service = this;
        var validID = 0;

        this.entityCollection = collection.create();

        this.create = create;
        this.Entity = Entity;
        this.Entity.prototype.handleMessage = handleMessage;
        this.Entity.prototype.step = step;
        this.Entity.prototype.die = die;

        ////////////////////////////////////////////////

        function create() {
            return new this.Entity();
        }

        function Entity() {
            this.id = validID;
            validID++;
            this.onMessage = {};

            service.entityCollection.add(this.id, this);
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
            service.entityCollection.remove(this.id);
        }

    }

})();
