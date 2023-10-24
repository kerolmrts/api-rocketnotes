const path = require ("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },

    pool:{
      afterCreate:(conn, cb) => conn.run("PRAGMA foreign_keys=ON", cb)
      //Pool: funcionalidade que será executada no momento em que estabelecer a conexão com o banco de dados
      //conn- connection / cb- callback
      //PRAGMA...: para habilitar a função de deletar em cascata
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex","migrations")
    },

    useNullAsDefault: true
  },


};
