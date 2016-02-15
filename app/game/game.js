app.service('game',['$q', 'message', function ($q, message) {
    this.loadMap = function (callback) {

    };

    this.loadObjects = function (callback) {

    };

    this.loadAssets = function (callback) {

    };

    this.weapons = {
        hand: {
            title: 'кулак',
            damage: 1
        },
        plank: {
            title: 'палка',
            damage: 2
        },
        knife: {
            title: 'нож',
            damage: 3
        },
        rose: {
            title: 'роза',
            damage: 4
        }
    };

    this.currentWeapon = {
        weapon: this.weapons.plank,
        border: ''
    };




    this.changeWeapon = function (newWeapon) {
        this.currentWeapon.weapon = newWeapon;
        this.currentWeapon.border = new Array(newWeapon.title.length+1).join('─');
    };

    this.changeWeapon(this.currentWeapon.weapon);



    this.actions = {
        move: {
            title: 'Идти',
            message: message.MOVE
        },
        attack: {
            title: 'Атаковать',
            message: message.ATTACK
        },
        look: {
            title: 'Осмотреть',
            message: message.LOOK
        },
        talk: {
            title: 'Говорить',
            message: message.TALK
        }
    };

    this.currentAction = this.actions.move;

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
        height: 4
    };

    this.startDialog = function (dialog) {
        var self = this;
        self.dialog.item = dialog;
        self.dialog.show = true;
        //self.onStopPlayer = null;
        /*this.onStopPlayer = function () {

        };*/
    };

    this.nextDialog = function () {
        if (this.dialog.show) {
            if (this.dialog.item.next) {
                this.dialog.item = this.dialog.item.next;
            } else {
                this.endDialog();
            }
            return true
        }
        return false;
    };

    this.endDialog = function () {
        this.dialog.show = false;
    };

    this.onStopPlayer = function () {};


}]);