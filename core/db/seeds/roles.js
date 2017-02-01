
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries.
  return knex('roles').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries.
        knex('roles').insert({
          role: 'admin'
        }),
        knex('roles').insert({
          role: 'staff'
        }),
        knex('roles').insert({
          role: 'member'
        })
      ])
    })
}
