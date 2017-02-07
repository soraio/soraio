var dbPrefix = require('../../../conf/config').dbPrefix
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(dbPrefix + 'users', function (table) {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.string('firstName')
    table.string('lastName')
    table.string('email')
    table.date('birth')
    table.integer('role_id').references(dbPrefix + 'roles.id')
    table.string('remember_token')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(dbPrefix + 'users')
}
