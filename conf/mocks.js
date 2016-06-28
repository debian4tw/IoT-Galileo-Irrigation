var mocks = {};

mocks['/getHistoricalData'] = {
    success : true, 
    date: new Date().toLocaleString(), 
    content: [
        { action: 1,  date: "3/29/2016, 2:30:15 PM",  type: 1},
        { action: 2,  date: "3/29/2016, 3:30:15 PM",  type: 1},
        { action: 1,  date: "3/29/2016, 6:30:15 PM",  type: 1},
        { action: 2,  date: "3/29/2016, 7:30:15 PM",  type: 1}
    ]
};

mocks['/getState'] = { 
    succes: true,
    date : new Date().toLocaleString(),
    content: { state : 1 }
};

mocks['/doAction1'] = { 
    succes: true,
    date : new Date().toLocaleString(),
    content: { state : 1 }
};

mocks['/doAction2'] = { 
    succes: true,
    date : new Date().toLocaleString(),
    content: { state : 2 }
};


module.exports = mocks;