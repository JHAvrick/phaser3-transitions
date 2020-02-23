import BaseTransition from './base-transition';

class MaterializeTransition extends BaseTransition {
    /**
     * 
     * @param {Phaser.Scene} scene - The parent scene
     * @param {Array.<Phaser.GameObjects.GameObject>} targets - An array of game objects to be included in this transition
     * @param {Object} [config] - The config object. Defaults will be used if not provided.
     * @param {Number} [config.duration=500] - The duration of this transition
     * @param {Bool} [config.chain=false] - When true, each object will enter individually with overlap determined by the `offset` setting
     * @param {String} [config.offset= 80% of duration] - The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc.
     * @param {Number} [config.fuzz=0] - A number between 0 and 1 which adds randomness to the duration of this transition
     * 
     */
    constructor(scene, targets, userConfig = {}){
        super({
            scene: scene,
            targets: targets,
            config: userConfig,
            defaults: MaterializeTransition.Defaults,
            affectedProps: MaterializeTransition.AffectedProps,
            enterConfig: MaterializeTransition.EnterConfig,
            exitConfig: MaterializeTransition.ExitConfig
        });
    }
}

MaterializeTransition.AffectedProps = ['alphaBottomLeft', 'alphaBottomRight', 'alphaTopLeft', 'alphaTopRight'];
MaterializeTransition.Defaults = {
    chain: false,
    fuzz: .75,
    offset: null, /* This is calculated later as 80% of duration time if left null */
    duration: 500
}

MaterializeTransition.EnterConfig = function(scene, config){
    let offset = config.offest || "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alphaBottomLeft', 'alphaBottomRight', 'alphaTopLeft', 'alphaTopRight']
    }
    
    return {
        props: ['alphaBottomLeft', 'alphaBottomRight', 'alphaTopLeft', 'alphaTopRight'],
        ease: 'Quad.easeOut',
        from: [0, 0, 0, 0],
        to: function(target){ 
            return  [
                target.alphaBottomLeft, 
                target.alphaBottomRight, 
                target.alphaTopLeft, 
                target.alphaTopRight
            ]   
        },
        duration: config.duration,
        offset: config.chain ? offset : 0
    }
}

MaterializeTransition.ExitConfig = function(scene, config){

    let offset = config.offest || "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alphaBottomLeft', 'alphaBottomRight', 'alphaTopLeft', 'alphaTopRight']
    }

    return {
        props: ['alphaBottomLeft', 'alphaBottomRight', 'alphaTopLeft', 'alphaTopRight'],
        ease: 'Quad.easeIn',
        from: function(target){
            return  [
                        target.alphaBottomLeft, 
                        target.alphaBottomRight, 
                        target.alphaTopLeft, 
                        target.alphaTopRight
                    ]  
        },
        to: [0, 0, 0, 0],
        duration: config.duration,
        offset: config.chain ? offset : 0
    }
}

export default MaterializeTransition;
