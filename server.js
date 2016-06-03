var http = require('http');

var server = function(mocks, config){
  
    var urls = {};
    
    function registerUrl(url, callback, mock){
        console.log('registering url' + url);
        //console.log('callback', callback());
        urls[url] = { 
            action : callback,
            mock: mock
        };
    }
    
    function response(content){
        return {
            success: true,
            date: new Date().toLocaleString(),
            content: content
        }
    }
    
    function errorResponse(msg){
        return {
            success: false,
            date: new Date().toLocaleString(),
            content: msg
        }
    }
    
    function startHttpServer(){
        var httpServer = http.createServer(function(req, res) {
            var content;
            console.log('requested url: ' + req.url);
             
            if(urls[req.url]){
                res.writeHead(200, {"Content-Type": "application/json"});
                
                if(config.mocksEnabled && typeof mocks[req.url] != "undefined"){
                    content = mocks[req.url];
                    console.log("responded with mock for " + req.url);
                } else {
                    content = urls[req.url].action(req.url);
                }
                 
                res.end(JSON.stringify(content));
            
                /*if ( Object.keys(mocks).indexOf(req.url) > -1 ){
                //res.writeHead(200);
                var resp = JSON.stringify(mocks[req.url]);
                res.end(resp);*/
            } else{
                res.writeHead(200);
                res.end('<h1>Not Found.</h1>');
                
            }


        });
        console.log('Starting http server in port ' + config.serverPort);
        httpServer.listen(config.serverPort);        
    }
    
    
    return {
        startHttpServer: startHttpServer,
        registerUrl : registerUrl,
        resonse: response
    }
    
    
    
};
    
module.exports = server;
   