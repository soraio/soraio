var dbPrefix = require('../../../conf/config').dbPrefix
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(dbPrefix + 'settings').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(dbPrefix + 'settings').insert({key: 'site_title', value: 'Sora Iro Fansubs', created_at: new Date(), updated_at: new Date()}),
        knex(dbPrefix + 'settings').insert({key: 'site_description', value: 'Indonesian Fansub Groups', created_at: new Date(), updated_at: new Date()}),
        knex(dbPrefix + 'settings').insert({key: 'site_irc', value: '#Sora-Iro@irc.rizon.net', created_at: new Date(), updated_at: new Date()}),
        knex(dbPrefix + 'settings').insert({key: 'site_favicon', value: 'favicon.ico', created_at: new Date(), updated_at: new Date()}),
        knex(dbPrefix + 'settings').insert({key: 'site_page_rows', value: 10, created_at: new Date(), updated_at: new Date()}),
        knex(dbPrefix + 'settings').insert({key: 'disqus_shortname', value: 'sora-iro', created_at: new Date(), updated_at: new Date()})
      ])
    })
}
