import BaseTransition from './base-transition';

class SlideFadeTransition extends BaseTransition {
    /** 
     * 
     * @param {Phaser.Scene} scene - The parent scene
     * @param {Array} targets - An array of game objects to be included in this transition
     * @param {Object} [config=SlideTransition.Defaults] - The config object. Defaults will be used if not provided.
     * @param {Number} [config.duration=500] - The duration of this transition
     * @param {Bool} [config.chain=false] - When true, each object will enter individually with overlap determined by the `offset` setting
     * @param {String} [config.offset= 80% of duration] - The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc.
     * @param {Number} [config.fuzz=0] - A number between 0 and 1 which adds randomness to the duration of this transition 
     * @param {String} [config.enterFrom='bottom'] - The direction from which the transition will enter. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"`
     * @param {String} [config.exitTo='top'] - The direction from which the transition will exit. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"`
     * @param {String} [config.distance= half of object width or height] - The slide distance
     */
    constructor(scene, targets, userConfig = {}){
        super({
            scene: scene,
            targets: targets,
            config: userConfig,
            defaults: SlideFadeTransition.Defaults,
            affectedProps: SlideFadeTransition.AffectedProps,
            enterConfig: SlideFadeTransition.EnterConfig,
            exitConfig: SlideFadeTransition.ExitConfig
        });
    }
}

SlideFadeTransition.AffectedProps = ['alpha', 'x', 'y'];
SlideFadeTransition.Defaults = {
    enterFrom: 'bottom',
    exitTo: 'top',
    chain: false,
    fuzz: 0,
    offset: null, /* This is calculated later as 80% of duration time if left null */
    duration: 500,
    distance: null /* If left null, this is calculated as half of width or height */
}

SlideFadeTransition.EnterConfig = function(scene, config){

    let directionProp = config.enterFrom == 'top' || config.enterFrom == 'bottom' ? 'y' : 'x';
    let offset = config.offest || "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alpha', 'x', 'y']
    }
    
    return {
        props: ['alpha', directionProp],
        ease: 'Quad.easeOut',
        duration: config.duration,
        offset: config.chain ? offset : 0,
        fuzz: fuzz,
        from: (target) => {
            let startPos = getSlidePosition(scene, target, config.enterFrom, config.distance);
            return [0, startPos];
        },
        to: function(target){ 
            return [target.alpha, target[directionProp]];
        },
    }
}

SlideFadeTransition.ExitConfig = function(scene, config){

    let directionProp = config.exitTo== 'top' || config.exitTo == 'bottom' ? 'y' : 'x';
    let offset = config.offest || "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alpha', 'x', 'y']
    }
    
    return {
        props: ['alpha', directionProp],
        ease: 'Quad.easeOut',
        duration: config.duration,
        offset: config.chain ? offset : 0,
        fuzz: fuzz,
        from: (target) => {
            return [target.alpha, target[directionProp]];
        },
        to: function(target){ 
            let endPos = getSlidePosition(scene, target, config.exitTo, config.distance);
            return [0, endPos];
        },
    }
}

function getSlidePosition(scene, target, direction, distance){
    switch (direction){
        case 'left':
            return target.getCenter().x - (distance || target.width);
        case 'right':
            return target.getCenter().x + (distance || target.width);
        case 'top': 
            return target.getCenter().y - (distance || target.height);
        case 'bottom':
            return target.getCenter().y + (distance || target.height);
    }    
}

export default SlideFadeTransition;
