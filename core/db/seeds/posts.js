
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries.
  return knex('posts').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries.
        knex('posts').insert({
          title: 'Hi no Youjin - Movie',
          slug: 'hi-no-youjin-movie',
          content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          dd_link: 'hi-no-youjin-movie.mkv',
          publish: true,
          anime_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date()

        }),
        knex('posts').insert({
          title: 'One Piece - Episode 01',
          slug: 'one-piece-episode-01',
          content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          dd_link: 'one-piece-episode-01.mkv',
          publish: true,
          anime_id: 2,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        })
      ])
    })
}
