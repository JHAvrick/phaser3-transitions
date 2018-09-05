import Phaser from 'phaser';
import DataSet from '../dat-gui-data';

class Main extends Phaser.Scene {
    constructor() {
        super({key: 'Main'});
    }

    getEnter(){
        let type = DataSet.enterData.type;
        let settings = DataSet.enterData.configs[type];
        let config = Object.assign({}, { type: type }, settings);
        this.enter =  this.transitions.create(this.targets, config);
    }

    getExit(){
        let type = DataSet.exitData.type;
        let settings = DataSet.exitData.configs[type];
        let config = Object.assign({}, { type: type }, settings);
        this.exit =  this.transitions.create(this.targets, config);
    }

    create(){
        this.targets = [];

        var btn = new Phaser.GameObjects.Sprite(this, 100, 100, 'button');
        this.add.existing(btn);
        this.targets.push(btn);

        this.getEnter();
        this.getExit();

        var entered = false;
        this.enter.enter().then(() => {
            entered = true;
        });

        this.input.keyboard.on('keydown', () => {
            if (this.enter.isTransitioning || this.exit.isTransitioning) return;

            if (entered){
                
                this.getExit();
                this.exit.exit().then(() => {
                    entered = false;
                })  
                
            } else {
                this.exit.resetProps();
                
                this.getEnter();
                this.enter.enter().then(() => {
                    entered = true;
                })
                
            }  
        });

    }

}

export default Main;