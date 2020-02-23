const EnterData = {
    type: 'slide',
    configs: {
        grow: {
            chain: false,
            duration: 750,
            fuzz: 0.01
        },
        explode: {
            chain: false,
            duration: 750,
            fuzz: 0.01,
            offset: 300
        },
        fade: {
            chain: false,
            duration: 750,
            fuzz: 0.01
        },
        slide: {
            enterFrom: 'left',
            chain: false,
            duration: 750,
            fuzz: 0.01
        },
        slidefade: {
            enterFrom: 'left',
            chain: false,
            duration: 750,
            fuzz: 0.01,
            distance: 0
        },
        materialize: {
            chain: false,
            duration: 750,
            fuzz: 0.50
        },
    }
}

const EnterMeta = {
    type: {
        Slide: 'slide',
        SlideFade: 'slidefade',
        Grow: 'grow',
        Explode: 'explode',
        Fade: 'fade',
        Materialize: 'materialize'
    },
    configs: {
        grow: {
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99]
        },
        explode: {
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99],
            offset: [0, 1000]
        },
        fade: {
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99]
        },
        slide: {
            enterFrom: {
                Left: 'left',
                Right: 'right',
                Top: 'top',
                Bottom: 'bottom'
            },
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99]
        },
        slidefade: {
            enterFrom: {
                Left: 'left',
                Right: 'right',
                Top: 'top',
                Bottom: 'bottom'
            },
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99],
            distance: [0, 2000]
        },
        materialize: {
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99]
        }  
    }
}

const ExitData = {
    type: 'slide',
    configs: {
        grow: {
            chain: false,
            duration: 750,
            fuzz: 0
        },
        explode: {
            chain: false,
            duration: 750,
            fuzz: 0
        },
        fade: {
            chain: false,
            duration: 750,
            fuzz: 0
        },
        slide: {
            exitTo: 'right',
            chain: false,
            duration: 750,
            fuzz: 0
        },
        slidefade: {
            exitTo: 'right',
            chain: false,
            duration: 750,
            fuzz: 0,
            distance: 0
        } ,
        materialize: {
            chain: false,
            duration: 750,
            fuzz: 0.50
        },
    }
}

const ExitMeta = {
    type: {
        Slide: 'slide',
        SlideFade: 'slidefade',
        Grow: 'grow',
        Explode: 'explode',
        Fade: 'fade',
        Materialize: 'materialize'
    },
    configs: {
        grow: {
            chain: null,
            duration: [100, 3000],
            fuzz: [0, .99]
        },
        explode: {
            chain: null,
            duration: [100, 3000],
            fuzz: [0, .99]
        },
        fade: {
            chain: null,
            duration: [100, 3000],
            fuzz: [0, .99]
        },
        slide: {
            exitTo: {
                Left: 'left',
                Right: 'right',
                Top: 'top',
                Bottom: 'bottom'
            },
            chain: null,
            duration: [100, 3000],
            fuzz: [0, .99]
        },
        slidefade: {
            exitTo: {
                Left: 'left',
                Right: 'right',
                Top: 'top',
                Bottom: 'bottom'
            },
            chain: null,
            duration: [100, 3000],
            fuzz: [0, .99],
            distance: [0, 2000]
        },
        materialize: {
            chain: null,
            duration: [100, 1500],
            fuzz: [0, .99]
        } 
    }
}

const DataSet = {
    enterData: EnterData,
    enterMeta: EnterMeta,
    exitData: ExitData,
    exitMeta: ExitMeta
}

export default DataSet;