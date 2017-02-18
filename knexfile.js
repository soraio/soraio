var config = require('./conf/config');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/core/db/data.db'
    },
    migrations: {
        directory: __dirname + '/core/db/migrations',
        tableName: 'schema_info'
    },
    seeds: {
      directory: __dirname + '/core/db/seeds'
    }
  },
  production: {
    client: 'mysql',
    connection: {
        host: config.databaseHost,
        user: config.databaseUsername,
        password: config.databasePassword,
        database: config.databaseName
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: __dirname + '/core/db/migrations',
        tableName: 'schema_info'
    },
    seeds: {
      directory: __dirname + '/core/db/seeds'
    }
  }
};
