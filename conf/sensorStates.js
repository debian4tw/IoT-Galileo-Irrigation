var sensorStates = {
	1: {
        label: "Desconectado", 
        upperLimit: 10000, 
        lowerLimit: 1000,
        pin: 13,
        color: "Red",
        triggersActuatorState: 2
    },
	2: { 
        label: "Seco", 
        upperLimit: 999,
        lowerLimit: 500,
        pin: 7,
        color: "Yellow",
        triggersActuatorState: 1
    },
	3: { 
        label: "Húmedo", 
        upperLimit: 499, 
        lowerLimit: 370,
        pin: 8,
        color: "Green",
        triggersActuatorState: 2
    },
	4: { 
        label: "Mojado", 
        upperLimit: 369, 
        lowerLimit: 0,
        pin: 12,
        color: "Blue",
        triggersActuatorState: 2
    }
};

module.exports = sensorStates;