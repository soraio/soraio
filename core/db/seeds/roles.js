var dbPrefix = require('../../../conf/config').dbPrefix
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries.
  return knex(dbPrefix + 'roles').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries.
        knex(dbPrefix + 'roles').insert({
          role: 'admin'
        }),
        knex(dbPrefix + 'roles').insert({
          role: 'staff'
        }),
        knex(dbPrefix + 'roles').insert({
          role: 'member'
        })
      ])
    })
}
