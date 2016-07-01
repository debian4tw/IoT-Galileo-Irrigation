Galileo server
--------------

> Sistema de riego automatizado con placa galileo, sensor de humedad y switch relay.

### Componentes principales
* board
* server
* storage

### Modelos
* sensor
* actuator


### npm modules used
* sqlite3 
* sequelize
* galileo-io (mraa)
* underscore
* moment
* jsdoc


### Setup ambiente de desarrollo


1) Instalar nodejs.

2) Asegurarse de que en conf/config.js están los siguientes valores:

    config.boardEnabled = false (este solo se pone en true cuando corre en la galileo)
    config.mocksEnabled = true
    cofig.serverEnabled = true
    
3) cd al directorio raíz del proyecto desde consola

4) Ejecutar desde consola: 

	node main.js

5) Browsear a:


	localhost:8080/getHistoricalData
	localhost:8080/getState
	localhost:8080/startAction
	localhost:8080/stopAction