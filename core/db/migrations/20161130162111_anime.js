var dbPrefix = require('../../../conf/config').dbPrefix
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(dbPrefix + 'animes', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('type')
    table.string('slug')
    table.string('cover')
    table.string('source')
    table.integer('score')
    table.string('status')
    table.string('aired')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(dbPrefix + 'animes')
}
