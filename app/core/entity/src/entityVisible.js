app.service('entityVisible', ['entity', 'sprite', function (entity, sprite) {
    this.create = function (x, y, image) {
        return new EntityVisible(x, y, image);
    }

    function EntityVisible (x, y, image) {
        this.entity = entity.create();
        this.sprite = sprite.create(image);
        this.x = x || 0;
        this.y = y || 0;
    }
}]);
