(function () {
    'use strict';

    angular
        .module('app')
        .service('collection', collection);

    // TODO запилить все классы с помошью value, с композиционной передачей зависимостей

    collection.$inject = [];

    function collection() {

        this.create = create;

        this.Collection = Collection;
        this.Collection.prototype.set = set;
        this.Collection.prototype.add = add;
        this.Collection.prototype.get = get;
        this.Collection.prototype.each = each;
        this.Collection.prototype.eachPart = eachPart;
        this.Collection.prototype.remove = remove;
        this.Collection.prototype.length = lengthCollection;
        this.Collection.prototype.getCollection = getCollection;
        this.Collection.prototype.clear = clear;

        //////////////////////////////////////////////////

        function create() {
            return new this.Collection();
        }

        function Collection() {
            this._data = {};
        }

        /**
         * Метод для замены или добавления нового элемента в коллекцию.
         * param {string} key          - идентификатор объекта в колекции
         * param {object} entity       - новый объект
         * return {object} предыдущий объект или undefined если объектов с таким ключом не было.
         */
        function set(key, entity) {
            var prev;

            if (typeof key === 'undefined' || key === null) {
                throw new Error('Param "key" is not defined!');
            }

            if (typeof entity === 'undefined' || entity === null) {
                throw new Error('Param "entity" is not defined!');
            }

            prev = this._data[key];

            this._data[key] = entity;

            return prev;
        }

        /**
         * Добавляет новый элемент. Если ключ занят - выведет ошибку
         * return {object} только что добавленный элемент
         */
        function add(key, entity) {
            if (this.get(key)) {
                throw new Error('Entity with key "' + key + '" already exists!');
            }

            this.set(key, entity);

            return entity;
        }

        /**
         * Взять из коллекции один объект по ключу
         * return {object} объект или undefined
         */
        function get(key) {
            return this._data[key];
        }

        /**
         * Проход по всем элементам колеекции и выполнение для них функции callback
         * param {function} callback - какое либо действие над каждым элеменетом коллекции
         *      Параметры колбека:
         *      param {string} key      - ключ текущего объекта
         *      param {object} entity   - текущий объект
         *      param {number} index    - индекс итерации
         *      param {object} entities - собственно сама коллекция
         */
        function each(callback, keys) {
            keys = keys || Object.keys(this._data);

            for (var i = 0; i < keys.length; i++) {
                callback(keys[i], this._data[keys[i]], i, this._data);
            }
        }

        function eachPart(begin, count, callback) {
            var keys;

            if (count < 0) {
                begin += count + 1;
                count = -count;
            }

            keys = Object.keys(this._data)
                .filter(function (item) {
                    return item >= begin && item < begin + count;
                });

            this.each(callback, keys);
        }

        /**
         * Удаление элемента коллекции по ключу
         * param {string} key - ключ удаляемого элемента
         * return {boolean} true - элемент удален. Если удаляемого элемента уже не было в коллекции то false
         */
        function remove(key) {
            if (typeof key === 'undefined' && key == null) {
                throw new Error('Param "key" is not defined!');
            }

            if (this._data[key]) {
                delete this._data[key];
                return true;
            }

            return false;
        }

        /**
         * Взять размер коллекции
         * return {number} размер коллекции
         */
        function lengthCollection() {
            return Object.keys(this._data).length;
        }

        /**
         * Взять коллекцию
         * return {object} сама коллекция
         */
        function getCollection() {
            return this._data;
        }

        /**
         * Очистка коллекции
         */
        function clear() {
            var self = this;

            self.each(function (key) {
                self.remove(key);
            });
        }

    }

})();
