const { Sequelize, Datatypes} = require('sequelize');

const database = new Sequelize('groupomania_db', 'groupomania_admin', '2txJG6?a5N5S!ZhvZwe', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  });

  database.authenticate()
  .then(
      () => console.log('Vous êtes connecté à la base de donnée' + process.env.DATABASE)
  ).catch(
      (error) => console.error("Erreur d'/authentification " + error)
  );

  module.exports = { Sequelize, Datatypes, database };