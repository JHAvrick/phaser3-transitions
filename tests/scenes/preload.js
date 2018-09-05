import Phaser from 'phaser';


class Preload extends Phaser.Scene {
    constructor() {
        super({key: 'Preload'});
    }

    preload(){
        this.load.image('button', "assets/sprites/button.png");
    }

    create(){
        this.scene.start('Main');
    }

}

export default Preload;