import BaseTransition from './base-transition';

class GrowTransition extends BaseTransition {
    /**
     * 
     * @param {*} scene
     * @param {*} targets
     * @param {*} config
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