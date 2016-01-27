app.service("entityCollection", [function () {
    var entities = {};

    /**
     * Метод для замены или добавления нового элемента в коллекцию.
     * param {string} key          - идентификатор объекта в колекции
     * param {object} entity       - новый объект
     * param {boolean} rememberKey - если true, то записывает в добавляемый объект его ключ (идентификатор)
     * return {object} предыдущий объект или undefined если объектов с таким ключом не было.
     */
    this.set = function (key, entity, rememberKey) {
        var prev = entities[key];

        entities[key] = entity;

        if (rememberKey) {
            entities[key]["_key"] = key;
        }

        return prev;
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
    }

    /**
     * Очистка коллекции
     */
    this.clear = function () {
        delete entities;
        entities = {};
    }
}]);
