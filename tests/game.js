import Phaser from 'phaser';
import DataSet from './dat-gui-data';
import DatGuiController from './dat-gui-controller';

/**
 * Create the GUI 
 */
const GuiController = new DatGuiController(DataSet);

/**
 * The Transitions plugin we are testing
 */
import { TransitionsPlugin } from '../build/phaser3-transitions';

/**
 * Scenes
 */
import Preload from './scenes/preload';
import Main from './scenes/main';


/**
 * Set up game config and create scenes
 */
const config = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    width: 400,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [
        Preload,
        Main
    ],
    plugins: {
        scene: [
            { 
                key: 'transitions', 
                mapping: 'transitions',
                plugin: TransitionsPlugin
            }
        ]
    },
};

const game = new Phaser.Game(config);