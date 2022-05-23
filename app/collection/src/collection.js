app.service("collection", [function () {
    var selfService = this;

    this.create = function () {
        return new selfService.Collection();
    };

    this.Collection = function () {
        var self = this;
        var entities = {};

        this._data = entities;

        /**
         * Метод для замены или добавления нового элемента в коллекцию.
         * param {string} key          - идентификатор объекта в колекции
         * param {object} entity       - новый объект
         * return {object} предыдущий объект или undefined если объектов с таким ключом не было.
         */
        this.set = function (key, entity) {
            var prev;

            if (typeof key === 'undefined' && key == null) {
                throw new Error("Param 'key' is not defined!");
            }

            if (typeof entity === 'undefined' && entity == null) {
                throw new Error("Param 'entity' is not defined!");
            }

            prev = entities[key];

            entities[key] = entity;

            return prev;
        };

        /**
         * Добавляет новый элемент. Если ключ занят - выведет ошибку
         * return {object} только что добавленный элемент
         */
        this.add = function (key, entity) {
            if (self.get(key)) {
                throw new Error("Entity with key '" + key + "' already exists!");
            }

            self.set(key, entity);

            return entity;
        };

        /**
         * Взять из коллекции один объект по ключу
         * return {object} объект или undefined
         */
        this.get = function (key) {
            return entities[key];
        };

        /**
         * Проход по всем элементам колеекции и выполнение для них функции callback
         * param {function} callback - какое либо действие над каждым элеменетом коллекции
         *      Параметры колбека:
         *      param {string} key      - ключ текущего объекта
         *      param {object} entity   - текущий объект
         *      param {number} index    - индекс итерации
         *      param {object} entities - собственно сама коллекция
         */
        this.each = function (callback) {
            var index = 0;
            for (var prop in entities) {
                callback(prop, entities[prop], index, entities);
                index++;
            }
        };

        /**
         * Удаление элемента коллекции по ключу
         * param {string} key - ключ удаляемого элемента
         * return {boolean} true - элемент удален. Если удаляемого элемента уже не было в коллекции то false
         */
        this.remove = function (key) {
            if (typeof key === 'undefined' && key == null) {
                throw new Error("Param 'key' is not defined!");
            }

            if (entities[key]) {
                delete entities[key];
                return true;
            }

            return false;
        };

        /**
         * Взять размер коллекции
         * return {number} размер коллекции
         */
        this.length = function () {
            var count = 0;
            for (var prop in entities) {
                count++;
            }
            return count;
        };

        /**
         * Взять коллекцию
         * return {object} сама коллекция
         */
        this.getCollection = function () {
            return entities;
        };

        /**
         * Очистка коллекции
         */
        this.clear = function () {
            self.each(function (key) {
                self.remove(key);
            });
        };

    };

}]);
