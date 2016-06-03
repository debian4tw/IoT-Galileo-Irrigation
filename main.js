/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var config = require('./conf/config');
var mocks = require('./conf/mocks');

var mraa = false;
var board = false;
var server = false;


if(config.boardEnabled){
    mraa = require('mraa');
    board = require('./board')(mraa);
    board.init();
}


if(config.serverEnabled){
    server = require('./server')(mocks,config);
    server.startHttpServer();
    
    //registro callbacks de urls de mocks
    /*
    for(var x in mocks){
        server.registerUrl(x,(function(url,action){

            return function(){
                console.log('requested '+url , action);
                return action;
            }
            
        }(x,mocks[x])),false);
    }*/
    
    server.registerUrl('/getHistoricalData', function(url){  
        var content;

        content = actions;
        
        return server.response(content);
         
    });


    server.registerUrl('/getActuatorState', function(url){
       return {
           succes: true,
           date: new Date.toLocaleString(),
           content: { state: board.getActuatorState() }
       } 
    });
    
    
    server.registerUrl('/startAction', function(url){
        board.doAction(1, "auto");
        return {
            succes: true,
            date: new Date.toLocaleString(),
            content: { state: board.getActuatorState() }           
        } 
    });
    
    
    server.registerUrl('/stopAction', function(url){ç
        board.doAction(2, "auto");
        return {
            succes: true,
            date: new Date.toLocaleString(),
            content: { state: board.getActuatorState() }           
        }         
    });


}


/*
* prueba escribir archivo
var fs = require('fs');
fs.writeFile('/www/pages/gal.html','<html><body><p>Galileo write</p></body></html>');
*/
