var dbPrefix = require('../../../conf/config').dbPrefix
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(dbPrefix + 'settings', function (table) {
    table.increments('id').primary()
    table.string('key')
    table.string('value')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(dbPrefix + 'settings')
};
