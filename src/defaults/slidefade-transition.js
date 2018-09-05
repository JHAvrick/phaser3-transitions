import BaseTransition from './base-transition';

class SlideFadeTransition extends BaseTransition {
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
    duration: 500
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
            let startPos = getSlidePosition(scene, target, config.enterFrom);
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
            let endPos = getSlidePosition(scene, target, config.exitTo);
            return [0, endPos];
        },
    }
}

function getSlidePosition(scene, target, direction){
    switch (direction){
        case 'left':
            return target.getCenter().x - target.width;
        case 'right':
            return target.getCenter().x + target.width;
        case 'top': 
            return target.getCenter().y - target.height;
        case 'bottom':
            return target.getCenter().y + target.height;
    }    
}

export default SlideFadeTransition;
