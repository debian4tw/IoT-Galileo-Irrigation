/*
MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/
var config = require('../conf/config');
var events = require('events');
var mraa = false;
if(config.boardEnabled){
    mraa = require('mraa');
}


var sensorStates = require('../conf/sensorStates');
var actuatorStates = require('../conf/actuatorStates');


/**
  * Encargado del io con la placa galileo: switch relay, leds, sensor de humedad, etc.
  * @namespace
  */
var board = function(){
    
    var analogPin0;
    var currentSensorState = false;
    var currentActuatorState = false;
    var actuator;
    var actions = [];
    var leds = {};
    var event = new events.EventEmitter();  
    

    /** loop */
    function loop() {
        var humedad = Medir_Humedad();
        
        for (var x in sensorStates){
            if( isInStateRange(humedad, sensorStates[x]) ){
                prenderLed(x);
                doAction(sensorStates[x].triggersActuatorState, "auto");
            }
        }
    }    

    /** 
    inicializa mraa, instancia io de placa, inicia loop 
    */
    function init(){
        console.log('init');
        if(!mraa){        
            console.log('cannot initialize board, missing mraa');
        }else{
            console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console    
            setupLeds();
        }

        setInterval(function(){
            loop();
        },3000);        
        
    }
    


    /** Medir Humedad */    
    function Medir_Humedad() {
        var humedad;
        if(mraa){
            humedad = analogPin0.read(); //read the value of the analog pin    
        } else{
            humedad = 400;
        }
                
        console.log('humedad:' + humedad);             

        return humedad;

    }
    
    /** doAction 
    * @param {actionId} triggerAction
    * @param {actionType} actionType
    */    
    function doAction(triggerAction, actionType){
        //console.log('doAction: ',currentActuatorState, triggerAction);
        if(currentActuatorState != triggerAction){            
            if(mraa){
                actuator.write(actuatorStates[triggerAction].signal);    
            }
            currentActuatorState = triggerAction;
            //saveAction(new Date().toLocaleString(), triggerAction, actionType);
            event.emit('ActionExecuted', triggerAction, actionType);
            //onActionExecuted(triggerAction, actionType);
        }
    }

    /** saveAction */    
    function saveAction(date, triggerAction, actionType){
         var action = { 
            action: triggerAction,
            date: date, 
            actionType: actionType 
        };
        actions.push(action);  
    }

    
    function isInStateRange(humedad, state){
        return (humedad > state.lowerLimit && humedad < state.upperLimit);
    }

  
    function setupLeds(){
        //var myOnboardLed = new mraa.Gpio(13); //LED hooked up to built in pin        
        //myOnboardLed.dir(mraa.DIR_OUT); 
        for(x in sensorStates){
            leds[x] = new mraa.Gpio(sensorStates[x].pin); //LED PIN
            leds[x].dir(mraa.DIR_OUT); //set the gpio direction to output
        }        

        actuator = new mraa.Gpio(actuatorStates[1].pin);
        actuator.dir(mraa.DIR_OUT);
        
        analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
    }
 
    function getActuatorState(){
        return currentActuatorState;
    }
    
    function prenderLed(state){
        if(!mraa){
            return;
        }
        if(currentSensorState != state){
            console.log('prendo led ' + sensorStates[state].pin + " " +sensorStates[state].color);

            leds[state].write(1);

            if(currentSensorState){
                apagarLed(currentSensorState);
            }
            currentSensorState = state;
        }
    }

    function apagarLed(state){
        //console.log('apago led');
        leds[state].write(0);
    }
        
    return {
        apagarLed : apagarLed,
        prenderLed: prenderLed,
        getActuatorState: getActuatorState,
        doAction: doAction,
        init: init,
        loop: loop,
        event: event
    }
    
};


module.exports = board;