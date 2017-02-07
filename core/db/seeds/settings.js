var dbPrefix = require('../../../conf/config').dbPrefix
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(dbPrefix + 'settings').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(dbPrefix + 'settings').insert({key: 'site_title', value: 'Sora Iro Fansubs'}),
        knex(dbPrefix + 'settings').insert({key: 'site_description', value: 'Indonesian Fansub Groups'}),
        knex(dbPrefix + 'settings').insert({key: 'site_irc', value: '#Sora-Iro@irc.rizon.net'}),
        knex(dbPrefix + 'settings').insert({key: 'site_favicon', value: 'favicon.ico'}),
        knex(dbPrefix + 'settings').insert({key: 'site_page_rows', value: 10})
      ])
    })
}
