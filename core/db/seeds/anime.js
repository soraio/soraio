
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
          producer: 'Shaft',
          episode: 12,
          source: 'Light Novel',
          synopsis: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          score: 9,
          genres: JSON.stringify(['a', 'b'])
        }),
        knex('animes').insert({
          id: 2,
          title: 'Hotarin',
          type: 'Movie',
          producer: 'Shift',
          episode: 1,
          source: 'Manga',
          synopsis: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          score: 8,
          genres: JSON.stringify(['c', 'd'])
        })
      ])
    })
}
