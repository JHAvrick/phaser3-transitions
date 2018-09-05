function getOffscreenPosition(scene, target, direction){
    switch (direction){
        case 'left':
            return -(target.displayWidth * target.originX);
        case 'right':
            let sceneWidth = scene.sys.game.config.width;
            return sceneWidth + (target.displayWidth * target.originX);
        case 'top': 
            return -(target.displayHeight * target.originY);
        case 'bottom':
            let sceneHeight = scene.sys.game.config.height;
            return sceneHeight + (target.displayHeight * target.originX);
    }  
}

export default getOffscreenPosition;