app.service("collection", [function () {

    this.create = function () {
        return new this.Collection();
    };

    this.Collection = function () {
        this._data = {};
    };

    /**
     * Метод для замены или добавления нового элемента в коллекцию.
     * param {string} key          - идентификатор объекта в колекции
     * param {object} entity       - новый объект
     * return {object} предыдущий объект или undefined если объектов с таким ключом не было.
     */
    this.Collection.prototype.set = function (key, entity) {
        var prev;

        if (typeof key === 'undefined' || key == null) {
            throw new Error("Param 'key' is not defined!");
        }

        if (typeof entity === 'undefined' || entity == null) {
            throw new Error("Param 'entity' is not defined!");
        }

        prev = this._data[key];

        this._data[key] = entity;

        return prev;
    };

    /**
     * Добавляет новый элемент. Если ключ занят - выведет ошибку
     * return {object} только что добавленный элемент
     */
    this.Collection.prototype.add = function (key, entity) {
        if (this.get(key)) {
            throw new Error("Entity with key '" + key + "' already exists!");
        }

        this.set(key, entity);

        return entity;
    };

    /**
     * Взять из коллекции один объект по ключу
     * return {object} объект или undefined
     */
    this.Collection.prototype.get = function (key) {
        return this._data[key];
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
    this.Collection.prototype.each = function (callback) {
        var index = 0;
        for (var prop in this._data) {
            callback(prop, this._data[prop], index, this._data);
            index++;
        }
    };

    /**
     * Удаление элемента коллекции по ключу
     * param {string} key - ключ удаляемого элемента
     * return {boolean} true - элемент удален. Если удаляемого элемента уже не было в коллекции то false
     */
    this.Collection.prototype.remove = function (key) {
        if (typeof key === 'undefined' && key == null) {
            throw new Error("Param 'key' is not defined!");
        }

        if (this._data[key]) {
            delete this._data[key];
            return true;
        }

        return false;
    };

    /**
     * Взять размер коллекции
     * return {number} размер коллекции
     */
    this.Collection.prototype.length = function () {
        var count = 0;
        for (var prop in this._data) {
            count++;
        }
        return count;
    };

    /**
     * Взять коллекцию
     * return {object} сама коллекция
     */
    this.Collection.prototype.getCollection = function () {
        return this._data;
    };

    /**
     * Очистка коллекции
     */
    this.Collection.prototype.clear = function () {
        var self = this;

        self.each(function (key) {
            self.remove(key);
        });
    };

}]);
