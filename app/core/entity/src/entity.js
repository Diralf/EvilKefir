app.service("entity", ["collection", function (collection) {
    var service = this;
    var validID = 0;

    this.entityCollection = collection.create();

    this.create = function () {
        return new this.Entity();
    };

    this.Entity = function () {
        this.id = validID;
        validID++;
        this.onMessage = {};

        service.entityCollection.add(this.id, this);
    };

    /**
     * в объект this.onMessage добавляется свойство
     *  имя которого есть type сообщения
     *  само свойство функция котороя обрабатывает сообщение данного типа
     *  в параметрах объект params
     *
     *  из вне вызывается метод handleMessage(type, params)
     * @param type
     * @param params
     */
    this.Entity.prototype.handleMessage = function (type) {
        if (this.onMessage.hasOwnProperty(type)) {
            return this.onMessage[type].apply(this, arguments);
        }

        return false;
    };

    this.Entity.prototype.step = function () {

    };

    this.Entity.prototype.die = function () {
        service.entityCollection.remove(this.id);
    };

}]);
