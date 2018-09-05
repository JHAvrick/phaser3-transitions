import BaseTransition from './base-transition';

class FadeTransition extends BaseTransition {
    /**
     * 
     * @param {*} scene 
     * @param {*} targets 
     * @param {*} config 
     */
    constructor(scene, targets, userConfig = {}){
        super({
            scene: scene,
            targets: targets,
            config: userConfig,
            defaults: FadeTransition.Defaults,
            affectedProps: FadeTransition.AffectedProps,
            enterConfig: FadeTransition.EnterConfig,
            exitConfig: FadeTransition.ExitConfig
        });
    }
}

FadeTransition.AffectedProps = ['alpha'];
FadeTransition.Defaults = {
    chain: false,
    fuzz: 0,
    offset: null, /* This is calculated later as 80% of duration time if left null */
    duration: 500
}

FadeTransition.EnterConfig = function(scene, config){
    let offset = config.offest || "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alpha']
    }
    
    return {
        props: ['alpha'],
        ease: 'Quad.easeOut',
        from: [0],
        to: function(target){ return [target.alpha] },
        duration: config.duration,
        offset: config.chain ? offset : 0
    }
}

FadeTransition.ExitConfig = function(scene, config){

    let offset = config.offest || "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alpha']
    }

    return {
        props: ['alpha'],
        ease: 'Quad.easeIn',
        from: function(target){ return [target.alpha] },
        to: [0],
        duration: config.duration,
        offset: config.chain ? offset : 0
    }
}

export default FadeTransition;
