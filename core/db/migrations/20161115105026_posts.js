
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('slug')
    table.text('content')
    table.string('dd_link')
    table.boolean('publish')
    table.integer('anime_id').references('animes.id')
    table.integer('user_id').references('users.id')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
