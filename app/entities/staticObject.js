app.service('staticObject', ['entityVisible',function (entityVisible) {
    this.StaticObject = function (x, y, image) {
        entityVisible.EntityVisible.call(this, x, y, image);

        this.onMessage.look = function (params) {
            console.log("he look on me! I - " + this.id);
            return true;
        };
    };

    this.StaticObject.prototype = Object.create(entityVisible.EntityVisible.prototype);
}]);