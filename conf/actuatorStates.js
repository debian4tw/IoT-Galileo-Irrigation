var actuatorStates = {   
	1 : { 
        label : "Regando",
        pin: 4,
        signal: 0
    },
	2 : { 
        label : "No Regando",
        pin: 4,
        signal: 1
    },

    Enum: {
        REGANDO: 1,
        NO_REGANDO: 2
    }
};

module.exports = actuatorStates;