import BaseTransition from './base-transition';
import getOffscreenPosition from './util/get-offscreen-pos';

class SlideTransition extends BaseTransition {
    /** 
     * 
     * @param {Phaser.Scene} scene - The parent scene
     * @param {Array} targets - An array of game objects to be included in this transition
     * @param {Object} [config=SlideTransition.Defaults] - The config object. Defaults will be used if not provided.
     * @param {Number} [config.duration=500] - The duration of this transition
     * @param {Bool} [config.chain=false] - When true, each object will enter individually with overlap determined by the `offset` setting
     * @param {String} [config.offset= 80% of duration] - The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc.
     * @param {Number} [config.fuzz=0] - A number between 0 and 1 which adds randomness to the duration of this transition 
     * @param {String} [config.enterFrom='left'] - The direction from which the transition will enter. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"`
     * @param {String} [config.exitTo='right'] - The direction from which the transition will exit. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"`
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