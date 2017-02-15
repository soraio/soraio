var dbPrefix = require('../../../conf/config').dbPrefix
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries.
  return knex(dbPrefix + 'pages').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries.
        knex(dbPrefix + 'pages').insert({
          title: 'About',
          slug: 'about',
          content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date()

        }),
        knex(dbPrefix + 'pages').insert({
          title: 'Staff',
          slug: 'staff',
          content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        })
      ])
    })
}
