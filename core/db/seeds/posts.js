
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries.
  return knex('posts').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries.
        knex('posts').insert({
          title: 'Anime Episode - 01',
          slug: 'anime_episode_-_01',
          content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          publish: true,
          anime_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date()

        }),
        knex('posts').insert({
          title: 'Anime Episode - 02',
          slug: 'anime_episode_-_02',
          content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          publish: true,
          anime_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        })
      ])
    })
}
