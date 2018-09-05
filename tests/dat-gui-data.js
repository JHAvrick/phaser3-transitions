const EnterData = {
    type: 'slide',
    configs: {
        grow: {
            chain: false,
            duration: 750,
            fuzz: .3
        },
        explode: {
            chain: false,
            duration: 750,
            fuzz: .2,
            offset: 300
        },
        fade: {
            chain: false,
            duration: 750,
            fuzz: .6
        },
        slide: {
            enterFrom: 'left',
            chain: false,
            duration: 750,
            fuzz: 0.0
        },
        slidefade: {
            enterFrom: 'left',
            chain: false,
            duration: 750,
            fuzz: 0.0
        }  
    }
}

const EnterMeta = {
    type: {
        Slide: 'slide',
        SlideFade: 'slidefade',
        Grow: 'grow',
        Explode: 'explode',
        Fade: 'fade'
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
            fuzz: 0
        }  
    }
}

const ExitMeta = {
    type: {
        Slide: 'slide',
        SlideFade: 'slidefade',
        Grow: 'grow',
        Explode: 'explode',
        Fade: 'fade'
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