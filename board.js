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
var sensorStates = require('./conf/sensorStates');
var actuatorStates = require('./conf/actuatorStates');

var board = function(mraa){
    
    var analogPin0;
    var currentSensorState;
    var currentActuatorState;
    var actuator;
    
    if(!mraa){        
        console.log('cannot initialize board, missing mraa');
        //return;
    }else{

        console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console    
        setupLeds();
    }

    
    function init(){
        loop();
    }
    


    function loop() {
      Medir_Humedad();
      setTimeout(loop,3000); //call the indicated function after 1 second (1000 milliseconds)
    }    

    
    function Medir_Humedad() {
        //humedad1 = analogRead(A5);
        //Serial.println(humedad1);
        var humedad = analogPin0.read(); //read the value of the analog pin
        
        console.log(humedad); //write the value of the analog pin to the console        
                        
        //var humedad = 400;
        
        for (var x in sensorStates){
            if( isInStateRange(humedad, sensorStates[x]) ){
                console.log(sensorStates[x].label);
                doAction(sensorStates[x].triggerAction, "auto");
            }
        }

    }
    
    function doAction(triggerAction, actionType){
        if(currentActuatorState != triggerAction){            
            actuator.write(actuatorStates[triggerAction].signal);
            currentActuatorState = triggerAction;
            saveAction(new Date(), triggerAction, actionType);
        }
    }
    
    function saveAction(){
        
    }
    
    function isInStateRange(humedad, state){
        return (humedad > state.lowerLimit && humedad < state.upperLimit);
    }

  
    function setupLeds(){
        var myOnboardLed = new mraa.Gpio(13); //LED hooked up to built in pin
        
        myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
        
        actuator = new mraa.Gpio(4);
        actuator.dir(mraa.DIR_OUT);
        
        analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)

    }    
 
    function getActuatorState(){
        return currentActuatorState;
    }
    
    function prenderLed(){
        console.log('prendo led');
        myOnboardLed.write(1);
    }

    function apagarLed(){
        console.log('apago led');
        myOnboardLed.write(0);
    }
    
    
    
    return {
        apagarLed : apagarLed,
        prenderLed: prenderLed,
        getActuatorState: getActuatorState,
        doAction: doAction,
        init: init
    }
    
}


module.exports = board;