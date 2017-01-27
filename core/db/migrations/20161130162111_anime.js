
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('animes', function (table) {
    table.increments('id').primary()
    table.string('title')
    table.string('type')
    table.string('cover')
    table.string('source')
    table.integer('score')
    table.string('status')
    table.string('aired')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('animes')
}
