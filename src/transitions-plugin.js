import Phaser from 'phaser';

/**
 * The default transitions classes
 */
import FadeTransition from './defaults/fade-transition';
import SlideTransition from './defaults/slide-transition';
import GrowTransition from './defaults/grow-transition';
import ExplodeTransition from './defaults/explode-transition';
import SlideFadeTransition from './defaults/slidefade-transition';

/**
 * Dictionary for resolving a key to it's respective transition class
 */
const Transitions = {
    fade: FadeTransition,
    slide: SlideTransition,
    grow: GrowTransition,
    explode: ExplodeTransition,
    slidefade: SlideFadeTransition,
    fadeslide: SlideFadeTransition
}

/**
 * The TransitionsPlugin is a small factory class which can be used to create
 * new transition objects. It also has it's own enter() and
 * exit() methods which can be used to create and run a transition without 
 * dealing w/ the actual transition object. For simple use cases this is ideal.
 */
class TransitionsPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.scene = scene;
    }

    /**
     * Adds a transition class to the dictionary. A transition class must extend
     * BaseTransition and be registered if it is not already one of the default
     * classes.
     * 
     * @param {*} key - The key by which the transition can be resolved
     * @param {*} transitionClass - The transition class
     */
    register(key, transitionClass){
        Transitions[key] = transitionClass;
    }

    /**
     * Creates a new transition based on the given config and returns it.
     * 
     * @param {Array} targets - The targets for this transition. These cannot be changed
     * once the transition is created.
     * @param {Object} config - Settings for the transition
     * @param {String} config.type - The transition key
     */
    create(targets, config){
        let transitionClass = Transitions[config.type.toLowerCase()];
        return new transitionClass(this.scene, targets, config);
    }
    
    /**
     * Creates and starts a new enter transition and returns a promise which 
     * resolves when the transition is complete.
     * 
     * @param {Array} targets - The GameObject targets to transition
     * @param {Object} config - Settings for the transition
     * @param {String} config.type - The transition key
     */
    enter(targets, config){
        let transitionClass = Transitions[config.type.toLowerCase()];
        let transition = new transitionClass(this.scene, targets, config);
        return transition.enter();
    }

    /**
     * Creates and starts a new exit transition and returns a promise which 
     * resolves when the transition is complete.
     * 
     * @param {Array} targets - The GameObject targets to transition
     * @param {Object} config - Settings for the transition
     * @param {String} config.type - The transition key
     */
    exit(targets, config){
        let transitionClass = Transitions[config.type.toLowerCase()];
        let transition = new transitionClass(this.scene, targets, config);
        return transition.exit();
    }

}

export default TransitionsPlugin;