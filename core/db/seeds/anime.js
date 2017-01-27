
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('animes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('animes').insert({
          id: 1,
          title: 'Hotarun',
          type: 'TV',
          cover: '/images/no-cover.jpg',
          source: 'Light Novel',
          aired: 'May ?,',
          status: 'Finished Airing',
          score: 9,
          created_at: new Date(),
          updated_at: new Date()
        }),
        knex('animes').insert({
          id: 2,
          title: 'Hotarin',
          type: 'Movie',
          cover: '/images/no-cover.jpg',
          source: 'Manga',
          aired: 'June ?,',
          status: 'Finished Airing',
          score: 8,
          created_at: new Date(),
          updated_at: new Date()
        })
      ])
    })
}
