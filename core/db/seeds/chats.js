var dbPrefix = require('../../../conf/config').dbPrefix
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(dbPrefix + 'chats').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(dbPrefix + 'chats').insert({message: 'Hello', user_id: 1, created_at: new Date(), updated_at: new Date()}),
        knex(dbPrefix + 'chats').insert({message: 'Hi', user_id: 2, created_at: new Date(), updated_at: new Date()})
      ])
    })
}
