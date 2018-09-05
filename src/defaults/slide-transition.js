import BaseTransition from './base-transition';
import getOffscreenPosition from './util/get-offscreen-pos';

class SlideTransition extends BaseTransition {
    /**
     * 
     * @param {Phaser.Scene} scene - The parent scene
     * @param {Array} targets - An array of targets for this transition
     * @param {Object} config - The primary config object
     * 
     * @param {Boolean} config.chain - Setting chain to true will result in each
     * item transition seperately in a cascading fashion
     * 
     * @param {String} config.offest - Ignored if chain is false. Determines how
     * much overlap there should be for chained transitions. Must be formatted 
     * as such: "-=500", "+=500", etc.
     * 
     * @param {Number} config.duration - The length of each the entire transition in ms,
     * or if "chain" is set to true, the length of each individual transition minus
     * their offset times.
     * 
     * @param {String} config.enter - The direction from which the transition
     * will enter. Valid options include: 'left', 'riight', 'top', and 'bottom'
     * 
     * @param {String} config.exit - The direction from which the transition
     * will exit. Valid options include: 'left', 'riight', 'top', and 'bottom'
     */
    constructor(scene, targets, userConfig = {}){
        super({
            scene: scene,
            targets: targets,
            config: userConfig,
            defaults: SlideTransition.Defaults,
            affectedProps: SlideTransition.AffectedProps,
            enterConfig: SlideTransition.EnterConfig,
            exitConfig: SlideTransition.ExitConfig
        }); 
    }
}

SlideTransition.AffectedProps = ['x', 'y'];
SlideTransition.Defaults = {
    chain: true,
    offset: null, /* This is calculated later as 80% of duration time */
    duration: 500,
    enterFrom: 'left',
    exitTo: 'right'
}

SlideTransition.EnterConfig = function(scene, config){

    let prop = config.enterFrom == 'top' || config.enterFrom == 'bottom' ? 'y' : 'x';
    let offset = config.offest != null ? config.offest : "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: prop
    }

    return {
        fuzz: fuzz,
        offset: config.chain ? offset : 0,
        duration: config.duration,
        props: [prop],
        ease: 'Quad.easeOut',
        from: (target) => { 
            return [getOffscreenPosition(scene, target, config.enterFrom)]
        },
        to: (target, index) => {
            return [target[prop]];
        }
    } 
}

SlideTransition.ExitConfig = function(scene, config){

    let prop = config.exitTo == 'top' || config.exitTo == 'bottom' ? 'y' : 'x';
    let offset = config.offest != null ? config.offest : "-=".concat(config.duration * .75);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: prop
    }

    return {
        fuzz: fuzz,
        offset: config.chain ? offset : 0,
        duration: config.duration,
        props: [prop],
        ease: 'Quad.easeIn',
        from: (target, index) => {
            return [target[prop]];
        },
        to: (target) => { 
            return [getOffscreenPosition(scene, target, config.exitTo)]
        }
    } 
}

export default SlideTransition;