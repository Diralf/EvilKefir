app.service('staticObject', ['entityVisible', 'message', function (entityVisible, message) {
    this.StaticObject = function (x, y, sprite, layer) {
        entityVisible.EntityVisible.call(this, x, y, sprite, layer);

        this.onMessage[message.LOOK] = function (params) {
            console.log("he look on me! I - " + this.id);
            return true;
        };
    };

    this.StaticObject.prototype = Object.create(entityVisible.EntityVisible.prototype);
}]);