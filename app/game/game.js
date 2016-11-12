app.service('game',['$q', 'message', 'dialogs', function ($q, message, dialogs) {
    this.loadMap = function (callback) {

    };

    this.loadObjects = function (callback) {

    };

    this.loadAssets = function (callback) {

    };

    this.weapons = {
        hand: {
            title: dialogs.weapons.fist,
            damage: 1
        },
        plank: {
            title: dialogs.weapons.stick,
            damage: 2
        },
        knife: {
            title: dialogs.weapons.knife,
            damage: 3
        },
        rose: {
            title: dialogs.weapons.rose,
            damage: 4
        }
    };

    this.currentWeapon = {
        weapon: this.weapons.hand,
        border: ''
    };




    this.changeWeapon = function (newWeapon) {
        this.currentWeapon.weapon = newWeapon;
        this.currentWeapon.border = new Array(newWeapon.title.length+1).join('─');
    };

    this.changeWeapon(this.currentWeapon.weapon);



    this.actions = {
        move: {
            title: dialogs.actions.move,
            message: message.MOVE
        },
        attack: {
            title: dialogs.actions.attack,
            message: message.ATTACK
        },
        look: {
            title: dialogs.actions.look,
            message: message.LOOK
        },
        talk: {
            title: dialogs.actions.talk,
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