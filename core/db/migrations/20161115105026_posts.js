var dbPrefix = require('../../../conf/config').dbPrefix
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(dbPrefix + 'posts', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('slug')
    table.text('content')
    table.string('dd_link')
    table.boolean('publish')
    table.integer('anime_id').references(dbPrefix + 'animes.id')
    table.integer('user_id').references(dbPrefix + 'users.id')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(dbPrefix + 'posts')
}
