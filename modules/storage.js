var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite:mydb.sqlite3', {
  dialect: 'sqlite',
  storage: './mydb.sqlite3'
});


/**
  * Storage description
  * @namespace
  */
var storage = function(){

  //Action model
  var Action;
  /** conecta al sqlite, crea tabla actions si no existe */
  function init(){
    sequelize
      .authenticate()
      .then(function(err) {
        console.log('Connection has been established successfully.');
      })
      .catch(function (err) {
        console.log('Unable to connect to the database:', err);
      });


    Action = sequelize.define('actions', {
      action: {
        type: Sequelize.INTEGER,
        //field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
      actionType: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      }
    }, {
      //freezeTableName: true // Model tableName will be the same as the model name
    });
  }

  /** devuelve todas las aciones */
  function findAll(){
    /*return Action.findAndCountAll().then(function(users){
      console.log(JSON.stringify(users.rows));
      //return JSON.stringify(users.rows);    
    });*/
    return Action.findAndCountAll();   
  }
  /** guarda action en tabla actions 
  @param {object} action - objecto con acción a ser guardada
  */
  function save(act){
    Action.sync({force: false}).then(function(){
      return Action.create(act);
    });
  }
  /** crea data de testing para gráfico */
  function createSampleData(){
    Action.sync({force: false}).then(function(){
      return Action.create(act);
    });
    
  }

  return {
    init: init,
    findAll: findAll,
    save: save
  }

};  


module.exports = storage;
