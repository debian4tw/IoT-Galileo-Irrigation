Galileo server

Para ejecutar desde una pc:
1)Instalar nodejs.
2)Asegurarse de que en conf/config.js están los siguientes valores:
    config.boardEnabled = false (este solo se pone en true cuando corre en la galileo)
    config.mocksEnabled = true
    cofig.serverEnabled = true
    
3)cd al directorio raíz del proyecto desde consola

4)Ejecutar desde consola: node main.js
5)Browsear a:

localhost:8080/getHistoricalData
localhost:8080/getState
localhost:8080/doAction1
localhost:8080/doAction2