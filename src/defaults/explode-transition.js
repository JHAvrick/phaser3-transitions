import BaseTransition from './base-transition';

class ExplodeTransition extends BaseTransition {
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
            defaults: ExplodeTransition.Defaults,
            affectedProps: ExplodeTransition.AffectedProps,
            enterConfig: ExplodeTransition.EnterConfig,
            exitConfig: ExplodeTransition.ExitConfig
        });
    }
}

ExplodeTransition.AffectedProps = ['alpha', 'scaleX', 'scaleY', 'x', 'y'];
ExplodeTransition.Defaults = {
    chain: false,
    fuzz: 0,
    offset: null, /* This is calculated later as 80% of duration time if left null */
    duration: 500
}

ExplodeTransition.EnterConfig = function(scene, config){

    let centerX = scene.sys.game.config.width / 2;
    let centerY = scene.sys.game.config.height / 2;
    let offset = config.offest != null ? config.offest : "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alpha', 'x', 'y']
    }

    return {
        fuzz: fuzz,
        offset: config.chain ? offset : 0,
        duration: config.duration,
        ease: 'Quad.easeOut',
        props: ['alpha', 'scaleX', 'scaleY', 'x', 'y'],
        from: [0, 0, 0, centerX, centerY],
        to: function(target){
            return  [
                        target.alpha, 
                        target.scaleX, 
                        target.scaleY, 
                        target.x, 
                        target.y
                    ]
        }
    }
}

ExplodeTransition.ExitConfig = function(scene, config){

    let centerX = scene.sys.game.config.width / 2;
    let centerY = scene.sys.game.config.height / 2;
    let offset = config.offest != null ? config.offest : "-=".concat(config.duration * .80);
    let fuzz = config.fuzz == null ? null : {
        ratio: config.fuzz,
        props: ['alpha', 'x', 'y']
    }

    return {
        fuzz: fuzz,
        offset: config.chain ? offset : 0,
        duration: config.duration,
        ease: 'Quad.easeIn',
        props: ['alpha', 'scaleX', 'scaleY', 'x', 'y'],
        from:  function(target){
            return  [
                        target.alpha, 
                        target.scaleX, 
                        target.scaleY, 
                        target.x, 
                        target.y
                    ]
        },
        to: [0, 0, 0, centerX, centerY]
    }
}

export default ExplodeTransition;