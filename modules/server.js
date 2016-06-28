var http = require('http');
var config = require('../conf/config');
var mocks = require('../conf/mocks');
var moment = require('moment');
/**
  * Galileo server description. starts in config port
  * @namespace server
  */

var server = (function(){
  
    /**
    * Stores registered urls
    * @property {object} urls - contains action and mock if exists.
    */
    var urls = {};


    /**
     * Registers url and  callback to be matched.
     * @param {string} url - The url of the book.
     * @param {string} callback - The author of the book.
     * @param {string} mock - The author of the book.     
     */    
    function registerUrl(url, callback, callbackAction){
        console.log('registering url' + url);
        //console.log('callback', callback());
        urls[url] = { 
            action : callback,
            callbackAction: callbackAction
        };
    }
    

    /** 
     * Returns server response 
     * @param {string} content - the content to be returned.
     */
    function response(content){
        return JSON.stringify({
            success: true,
            date: moment().format(config.dateFormat),
            content: content
        });
    }
    
    /** 
     * Returns error response 
     * @param {string} msg - the msg to be returned.
     */    
    function errorResponse(msg){
        return {
            success: false,
            date: moment().format(config.dateFormat),
            content: msg
        }
    }
    
    /** 
     * Starts server 
     */    
    function init(){
      var httpServer = http.createServer(function(req, res) {
        var content;
        console.log('requested url: ' + req.url);
         
        if(urls[req.url]){
            res.writeHead(200, {"Content-Type": "application/json"});
            

            if(config.mocksEnabled && typeof mocks[req.url] != "undefined"){
                content = mocks[req.url];
                console.log("responded with mock for " + req.url);
                res.end(JSON.stringify(content));
            }
            else if(typeof urls[req.url].callbackAction == 'function'){
                urls[req.url].callbackAction(req, res);

            }
             else {
                content = urls[req.url].action(req.url);
                res.end(JSON.stringify(content));                
            }                             
        
        } else{
            res.writeHead(200);
            res.end('<h1>Not Found.</h1>');
            
        }


      });
      console.log('Starting http server in port ' + config.serverPort);
      httpServer.listen(config.serverPort);        
    }
    
    
    return {
        init: init,
        registerUrl : registerUrl,
        response: response
    }
    
})();
    
module.exports = server;
   