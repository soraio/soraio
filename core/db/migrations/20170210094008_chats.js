var dbPrefix = require('../../../conf/config').dbPrefix
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(dbPrefix + 'chats', function (table) {
    table.increments('id').primary()
    table.string('message')
    table.integer('user_id').references(dbPrefix + 'users.id')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(dbPrefix + 'chats')
};
