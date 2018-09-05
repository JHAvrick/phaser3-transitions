import * as dat from 'dat.gui';

class DatGuiController {
    constructor(dataSet){
        this.dataSet = dataSet;

        //Create the GUI
        this.gui = new dat.GUI({ autoPlace: false, width: 200 });
        document.getElementById('gui-container').appendChild(this.gui.domElement);

        this.gui.add({ Menu: 'List' }, 'Menu');

        //Create the folders
        this.enterF = this.gui.addFolder('Enter');
        this.exitF = this.gui.addFolder('Exit');

        this.enterF.closed = false;
        this.exitF.closed = false;

        //Create the type controllers and add onChange events
        this.enterF.add(dataSet.enterData, 'type', dataSet.enterMeta.type)
         .onFinishChange(this.handleEnterChange.bind(this));

        this.exitF.add(dataSet.exitData, 'type', dataSet.exitMeta.type)
         .onFinishChange(this.handleExitChange.bind(this));

        //Arrays to hold items that are added/removed on type change
        this.enterI = [];
        this.exitI = [];

        //Init
        this.addEnterItems();
        this.addExitItems();
    }

    clearEnterItems(){
        console.log(this.enterI);

        this.enterI.forEach(item => {
            this.enterF.remove(item);
        });

        this.enterI = [];
    }

    clearExitItems(){
        this.exitI.forEach(item => {
            console.log(item);
            this.exitF.remove(item);
        });

        this.exitI = [];
    }

    addEnterItems(){
        let type = this.dataSet.enterData.type;
        let config = this.dataSet.enterData.configs[type];
        let meta = this.dataSet.enterMeta.configs[type];

        for (var key in config){
            let optionMeta = meta[key];

            var item;
            if (Array.isArray(optionMeta))
                item = this.enterF.add(config, key, ...optionMeta);
            else
                item = this.enterF.add(config, key, optionMeta);

            this.enterI.push(item);

        }
    }

    addExitItems(){
        let type = this.dataSet.exitData.type;
        let config = this.dataSet.exitData.configs[type];
        let meta = this.dataSet.exitMeta.configs[type];

        for (var key in config){
            let optionMeta = meta[key];

            var item;
            if (Array.isArray(optionMeta))
                item = this.exitF.add(config, key, ...optionMeta);
            else
                item = this.exitF.add(config, key, optionMeta);

            this.exitI.push(item);
        }
    }


    handleEnterChange(value){
        this.clearEnterItems();
        this.addEnterItems();
    }

    handleExitChange(value){
        this.clearExitItems();
        this.addExitItems();
    }

}

export default DatGuiController;