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

    this.dialog = {
        item: {
            id: '1',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae ipsum porta, egestas sapien sed, vestibulum lectus. Vivamus malesuada neque sit amet massa placerat rutrum. Vivamus imperdiet facilisis iaculis. Ut aliquam consequat vestibulum. Proin sed ultrices tellus. Maecenas mollis ultricies dui non fermentum. Fusce turpis lectus, sodales sed nisl sit amet, commodo mattis nibh.",
            next: {
                id: '2',
                text: "1111 ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae ipsum porta, egestas sapien sed, vestibulum lectus. Vivamus malesuada neque sit amet massa placerat rutrum. Vivamus imperdiet facilisis iaculis. Ut aliquam consequat vestibulum. Proin sed ultrices tellus. Maecenas mollis ultricies dui non fermentum. Fusce turpis lectus, sodales sed nisl sit amet, commodo mattis nibh.",
                next: null
            }
        },
        show: false,
        height: 7
    }
}]);