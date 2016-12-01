
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('animes', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('type')
    table.string('producer')
    table.integer('episode')
    table.string('source')
    table.text('synopsis')
    table.integer('score')
    table.json('genres')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('animes')
}
