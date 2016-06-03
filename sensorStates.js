var sensorStates = {
	1: {
        label: "Sin Medir", 
        upperLimit: 10000, 
        lowerLimit: 1000,
        pin: "red",
        triggersActuatorState: 2
    },
	2: { 
        label: "Seco", 
        upperLimit: 999, 
        lowerLimit: 500,
        pin: "yellow",
        triggersActuatorState: 1
    },
	3: { 
        label: "Húmedo", 
        upperLimit: 499, 
        lowerLimit: 370,
        pin: "green",
        triggersActuatorState: 2
    },
	4: { 
        label: "Mojado", 
        upperLimit: 369, 
        lowerLimit: 0,
        pin: "blue",
        triggersActuatorState: 2
    }
};


module.exports = sensorStates;