var dbPrefix = require('../../../conf/config').dbPrefix
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(dbPrefix + 'animes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(dbPrefix + 'animes').insert({
          id: 1,
          title: 'Hi no Youjin',
          type: 'Movie',
          slug: 'hi-no-youjin',
          cover: '//myanimelist.cdn-dena.com/images/anime/10/53165.jpg?s=f03c52d4f984d14f38f3949f4ba3b9fa',
          source: '//myanimelist.net/anime/13639/Hi_no_Youjin',
          aired: 'Jun 4, 2012',
          status: 'Finished Airing',
          score: 9,
          created_at: new Date(),
          updated_at: new Date()
        }),
        knex(dbPrefix + 'animes').insert({
          id: 2,
          title: 'One Piece',
          type: 'TV',
          slug: 'one-piece',
          cover: '//myanimelist.cdn-dena.com/images/anime/6/73245.jpg?s=4834ab4eee979b4fd5014976245b64ac',
          source: '//myanimelist.net/anime/21/One_Piece',
          aired: 'Oct 20, 1999 to ?',
          status: 'Currently Airing',
          score: 8,
          created_at: new Date(),
          updated_at: new Date()
        })
      ])
    })
}
