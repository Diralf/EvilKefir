app.service('game',['$q', function ($q) {
    this.loadMap = function (callback) {

    };

    this.loadObjects = function (callback) {

    };

    this.loadAssets = function (callback) {

    };

    this.weapon = 'кулак';
    this.borderWeapon = '';
    this.changeWeapon = function (newWeapon) {
        this.weapon = newWeapon;
        this.borderWeapon = new Array(newWeapon.length+1).join('─');
    };

    this.actions = {
        move: 'Идти',
        attack: 'Атаковать',
        look: 'Осмотреть',
        talk: 'Говорить'
    };

    this.currectAction = this.actions.move;
}]);