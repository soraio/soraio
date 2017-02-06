
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('downloads', function (table) {
    table.increments('id').primary()
    table.string('ip')
    table.string('token')
    table.string('link')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('downloads')
};
