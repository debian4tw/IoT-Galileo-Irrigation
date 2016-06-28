/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var config = require('./conf/config');
var mocks = require('./conf/mocks');
var actions = require('./conf/actions');
var moment = require('moment');
//modules
var storage = require('./modules/storage');
var server = require('./modules/server');
var board = require('./modules/board');

storage.init();
server.init();
board.init();


board.setOnActionExecuted(function(triggerAction, actionType){
    var action = { 
        action: triggerAction,
        date: moment().format(config.dateFormat),
        actionType: actionType 
    };
    console.log(action);

    storage.save(action); 
});






//Urls
server.registerUrl('/getHistoricalData', function(){}, function(req, res){
    
    storage.findAll().then(function(users){
        //var content =  JSON.stringify(users.rows);
        var content =  users.rows;
        res.end(server.response(content));
    });
    
});

server.registerUrl('/getActuatorState', function(url){
    
    var content;
    content = board.getActuatorState();
    
    return server.response(content);

});

server.registerUrl('/startAction', function(url){
    
    var content;    
    board.doAction(actions.INICIO_RIEGO, "manual");

    content = board.getActuatorState();
    
    return server.response(content);

});

server.registerUrl('/stopAction', function(url){
    
    var content;
    board.doAction(actions.FIN_RIEGO, "manual");
    content = board.getActuatorState();
    
    return server.response(content);

});
