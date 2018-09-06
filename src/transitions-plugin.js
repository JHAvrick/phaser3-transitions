import Phaser from 'phaser';

/**
 * The default transitions classes
 */
import FadeTransition from './defaults/fade-transition';
import SlideTransition from './defaults/slide-transition';
import GrowTransition from './defaults/grow-transition';
import ExplodeTransition from './defaults/explode-transition';
import SlideFadeTransition from './defaults/slidefade-transition';
import BaseTransition from './defaults/base-transition';

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
 * @typicalname transitions
 */
class TransitionsPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.scene = scene;
    }

    /**
     * Adds a transition class to the plugin's dictionary. A transition class must extend
     * BaseTransition and be registered if it is not already one of the default
     * classes.
     * 
     * @param {String} key - The key by which the transition can be referenced
     * @param {BaseTransition} transitionClass - A class which extends the BaseTransition class
     */
    register(key, transitionClass){
        Transitions[key] = transitionClass;
    }

    /**
     * Creates a new transition based on the given config
     * 
     * @param {Array} targets - The targets for this transition. These cannot be changed
     * once the transition is created.
     * @param {Object} config - Settings for the transition
     * @param {String} config.type - A key to one of the default transitions, which currently includes any of the following: `"Fade"`, `"Slide"`, `"Grow"`, `"Explode"`, or `"FadeSlide"`. See the class descriptions for more info about each transition. 
     * @returns {BaseTransition} - A transition class extending `BaseTransition`
     */
    create(targets, config){
        let transitionClass = Transitions[config.type.toLowerCase()];
        return new transitionClass(this.scene, targets, config);
    }
    
    /**
     * Creates and starts a new enter transition
     * 
     * @param {Array} targets - The GameObject targets to transition
     * @param {Object} config - Settings for the transition. Must contain a transition-type key, but can also contain other config settings for the given transition type.
     * @param {String} config.type - The transition key
     * @returns {Promise} - Returns a promise which resolves when the transition is complete
     */
    enter(targets, config){
        let transitionClass = Transitions[config.type.toLowerCase()];
        let transition = new transitionClass(this.scene, targets, config);
        return transition.enter();
    }

    /**
     * Creates and starts a new exit transition
     * 
     * @param {Array} targets - The GameObject targets to transition
     * @param {Object} config - Settings for the transition. Must contain a transition-type key, but can also contain other config settings for the given transition type.
     * @param {String} config.type - The transition key
     * @returns {Promise} - Returns a promise which resolves when the transition is complete
     */
    exit(targets, config){
        //Get and create the transition class
        let transitionClass = Transitions[config.type.toLowerCase()];
        let transition = new transitionClass(this.scene, targets, config);
        return transition.exit();
    }

}

export default TransitionsPlugin;