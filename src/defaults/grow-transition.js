import BaseTransition from './base-transition';

class GrowTransition extends BaseTransition {
    /** 
     * 
     * @param {Phaser.Scene} scene - The parent scene
     * @param {Array} targets - An array of game objects to be included in this transition
     * @param {Object} [config=SlideTransition.Defaults] - The config object. Defaults will be used if not provided.
     * @param {Number} [config.duration=500] - The duration of this transition
     * @param {Bool} [config.chain=false] - When true, each object will enter individually with overlap determined by the `offset` setting
     * @param {String} [config.offset= 80% of duration] - The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc.
     * @param {Number} [config.fuzz=0] - A number between 0 and 1 which adds randomness to the duration of this transition 
     */
    constructor(scene, targets, config = {}){
        super({
            scene: scene,
            targets: targets,
            config: config,
            defaults: GrowTransition.Defaults,
            affectedProps: GrowTransition.AffectedProps,
            enterConfig: GrowTransition.EnterConfig,
            exitConfig: GrowTransition.ExitConfig
        }); 
    }
}

GrowTransition.AffectedProps = ['scaleX', 'scaleY'];
GrowTransition.Defaults = {
    chain: false,
    offset: "-=300",
    fuzz: 0,
    duration: 500
}

GrowTransition.EnterConfig = function(scene, config) {

    let fuzz = { ratio: config.fuzz, props: ['scaleX', 'scaleY'] }
    let offset = config.chain ? config.offset : 0;
    let duration = config.duration;
    
    return {
        fuzz: fuzz,
        offset: offset,
        duration: duration,
        ease: 'Quad.easeOut',
        props: ['scaleX', 'scaleY'],
        from: [0, 0],
        to: function(target){
            return  [target.scaleX, target.scaleY]
        }
    }
}

GrowTransition.ExitConfig = function(scene, config) {

    let fuzz = { ratio: config.fuzz, props: ['scaleX', 'scaleY'] }
    let offset = config.chain ? config.offset : 0;
    let duration = config.duration;

    return {
        fuzz: fuzz,
        offset: offset,
        duration: duration,
        ease: 'Quad.easeIn',
        props: ['scaleX', 'scaleY'],
        from: function(target){
            return  [target.scaleX, target.scaleY]
        },
        to: [0, 0]
    }
}

export default GrowTransition;