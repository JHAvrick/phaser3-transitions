import isFunction from 'lodash.isfunction';
import fuzzInt from './fuzz-int';

function chain(scene, targets, config){

    /**
     * Make our timelines up front as no position within the loop is suitable
     * for their creation
     */
    var timelines = config.props.map(() => scene.tweens.createTimeline());

    /**
     * Loop through each target, and then each property to be tweened
     */
    targets.forEach((target, index) => {

        /**
         * Get the start and ending values. These may be strings (for single props),
         * or arrays (for multiple props).
         */
        let startVal = isFunction(config.from) ? config.from(target, index) : config.from;
        let endVal = isFunction(config.to) ? config.to(target, index) : config.to;
        

        /**
         * Wrap the prop in an array if it is not already an array
         * (for the sake of convenience), and then loop through all props and 
         * create a new timeline for each
         */
        //var timeline = scene.tweens.createTimeline();
        for (let i = 0; i < config.props.length; i++){
            let fuzzRatio = config.fuzz != undefined 
                            && config.fuzz.props.includes(config.props[i])
                            ? config.fuzz.ratio
                            : 0;
            
            let tween = {
                targets: target,
                ease: config.ease,
                duration: fuzzInt(config.duration, fuzzRatio),
                offset: config.offset
            }

            //Set start and end values for the target from the props array
            tween[config.props[i]] = endVal[i];
            target[config.props[i]] = startVal[i];
            
            timelines[i].add(tween);
        }
    });

    /**
     * Play all the timelines and collect their promises
     */
    let promises = []
    timelines.forEach(timeline => {
        promises.push(new Promise((resolve, reject) => {
            timeline.on("complete", () => {
                resolve();
            });
        }));
        timeline.play();
    })

    return Promise.all(promises);
}

export default chain;
